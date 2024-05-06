import { Change, FirestoreEvent } from 'firebase-functions/v2/firestore';
import {
  FirestoreChange,
  State,
  ProcessConfig,
  getChangeType,
  ChangeType,
  now,
  FirestoreField,
} from './common';
import { DocumentData, DocumentSnapshot } from 'firebase-admin/firestore';

export class FirestoreOnWriteProcessor<
  TInput,
  TOutput extends Record<string, FirestoreField>
> {
  inputField: string;
  processFn: (
    val: TInput,
    event: FirestoreEvent<
      Change<DocumentSnapshot<DocumentData>> | undefined,
      Record<string, string>
    >
  ) => Promise<TOutput>;
  statusField: string;
  processUpdates: boolean;
  orderField: string;
  errorFn: (e: unknown) => string;

  constructor(options: ProcessConfig<TInput, TOutput>) {
    this.inputField = options.inputField;
    this.orderField = options.orderField || 'createTime';
    this.processFn = options.processFn;
    this.statusField = options.statusField || 'status';
    this.processUpdates = true;
    this.errorFn = options.errorFn;
  }

  private shouldProcess(
    change: FirestoreChange,
    changeType: ChangeType,
    state: State
  ) {
    const newValue = this.getLatestInputValue(change);
    const oldValue = this.getPreviousInputValue(change);

    const hasChanged =
      changeType === ChangeType.CREATE ||
      (this.processUpdates &&
        changeType === ChangeType.UPDATE &&
        oldValue !== newValue);

    if (
      !newValue ||
      [State.PROCESSING, State.COMPLETED, State.ERROR].includes(state) ||
      !hasChanged ||
      typeof newValue !== 'string'
    ) {
      return false;
    }
    return true;
  }

  private getLatestInputValue(change: FirestoreChange) {
    return change.after?.get(this.inputField);
  }
  private getPreviousInputValue(change: FirestoreChange) {
    return change.before?.get(this.inputField);
  }

  private async writeStartEvent(change: FirestoreChange) {
    const createTime = change.after.createTime!;
    const updateTime = now();

    const status = {
      state: State.PROCESSING,
      startTime: updateTime,
      updateTime,
    };

    const startData = change.after.get(this.orderField);
    // todo: fix type
    const update = startData
      ? { [this.statusField]: status }
      : { [this.orderField]: createTime, [this.statusField]: status };

    await change.after.ref.update(update);
  }

  private async writeCompletionEvent(change: FirestoreChange, output: TOutput) {
    const updateTime = now();
    const stateField = `${this.statusField}.state`;
    const updateTimeField = `${this.statusField}.updateTime`;
    const completeTimeField = `${this.statusField}.completeTime`;
    await change.after.ref.update({
      ...output,
      [stateField]: State.COMPLETED,
      [updateTimeField]: updateTime,
      [completeTimeField]: updateTime,
    });
  }

  private async writeErrorEvent(change: FirestoreChange, e: unknown) {
    const eventTimestamp = now();

    const errorMessage = this.errorFn(e);
    await change.after.ref.update({
      [this.statusField]: {
        state: State.ERROR,
        updateTime: eventTimestamp,
        error: errorMessage,
      },
    });
  }

  async run(
    event: FirestoreEvent<
      Change<DocumentSnapshot<DocumentData>> | undefined,
      Record<string, string>
    >
  ): Promise<void> {
    if (!event) return console.error('no event data');

    const data = event.data;
    if (!data) return console.error('no document data');

    const changeType = getChangeType(data);
    if (changeType === ChangeType.DELETE) return;

    // Initialize or get the status
    const state: State = data.after.get(this.statusField)?.state;

    if (!this.shouldProcess(data, changeType, state)) {
      return;
    }

    await this.writeStartEvent(data);

    try {
      const input = this.getLatestInputValue(data);
      const output = await this.processFn(input, event);
      await this.writeCompletionEvent(data, output);
    } catch (e) {
      console.log('message processing error', e);
      await this.writeErrorEvent(data, e);
    }
  }
}
