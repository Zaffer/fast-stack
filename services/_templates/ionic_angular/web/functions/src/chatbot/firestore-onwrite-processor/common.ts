import { Change } from 'firebase-functions/v2';
import { DocumentSnapshot } from 'firebase-admin/firestore';
import {
  DocumentData,
  FieldValue,
  GeoPoint,
  Timestamp,
} from 'firebase-admin/firestore';
import { FirestoreEvent } from 'firebase-functions/v2/firestore';

export type FirestoreChange = Change<DocumentSnapshot>;

export enum ChangeType {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export enum State {
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR',
}

export interface Status {
  state: State;
  updateTime: Timestamp;
  startTime: Timestamp;
}

// TODO missing reference type
export type FirestoreField =
  | string
  | number
  | boolean
  | Timestamp
  | Array<any>
  | Record<string, any>
  | GeoPoint
  | undefined
  | null;

export const now = () => FieldValue.serverTimestamp();

export interface ProcessConfig<
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
  errorFn: (e: unknown) => string;
  statusField?: string;
  orderField?: string;
}

export const getChangeType = (change: FirestoreChange) => {
  if (!change.before || !change.before.exists) {
    return ChangeType.CREATE;
  }
  if (!change.after || !change.after.exists) {
    return ChangeType.DELETE;
  }
  return ChangeType.UPDATE;
};

export const isDelete = (change: FirestoreChange) =>
  getChangeType(change) === ChangeType.DELETE;

export const isUpdate = (change: FirestoreChange) =>
  getChangeType(change) === ChangeType.UPDATE;

export const isCreate = (change: FirestoreChange) =>
  getChangeType(change) === ChangeType.CREATE;
