import { Messages } from './messages';

/**
 * Thread document model, this is collection of threads for the user.
 */
export interface Threads {
  messages: Messages[];
  thread_id?: string;
}
