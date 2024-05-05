import { Timestamp } from '@angular/fire/firestore';

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

/**
 * Mesages document model, this is collection of messages for within each Thread.
 */
export interface Messages {
  prompt: string;
  createTime?: Timestamp | undefined;
  status?: Status | undefined;
}
