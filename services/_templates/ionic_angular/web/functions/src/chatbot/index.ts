/**
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { onDocumentWritten } from 'firebase-functions/v2/firestore';
import config from './config';
import { FirestoreOnWriteProcessor } from './firestore-onwrite-processor';
import { generateChatResponse } from './generate_chat_response';
import { createErrorMessage } from './errors';

// TODO: needs logging/error logging, and fixing tests
// logs.init(config);

const processorOptions = {
  inputField: config.promptField,
  processFn: generateChatResponse,
  errorFn: createErrorMessage,
};

const processor = new FirestoreOnWriteProcessor<
  string,
  Record<string, string | string[]>
>(processorOptions);

export const generateMessage = onDocumentWritten(
  config.collectionName,
  async (event) => {
    if (!event) return console.error(`no document at ${config.collectionName}`);
    return processor.run(event);
  }
);
