import { Message } from './messages';

/**
 * Thread document model, this is collection of threads for the user.
 */
export interface Threads {
  messages: Message[];
  thread_id?: string;
}
