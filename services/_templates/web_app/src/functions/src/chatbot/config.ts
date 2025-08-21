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

import { SafetySetting as VertexSafetySetting } from '@google-cloud/vertexai';

import { SafetySetting as GoogleAISafetySetting } from '@google/generative-ai';

export enum GenerativeAIProvider {
  OPENAI = 'openai',
  GOOGLE_AI = 'google-ai',
  VERTEX_AI = 'vertex-ai',
}

export interface Config {
  openai: {
    namespace: string;
    apiKey: string;
    model: string;
    assistantId: string;
  };
  vertex: {
    model: string;
  };
  googleAi: {
    model: string;
    apiKey?: string;
  };
  context?: string;
  location: string;
  projectId: string;
  instanceId: string;
  promptField: string;
  responseField: string;
  orderField: string;
  enableDiscussionOptionOverrides: boolean;
  enableThreadRetrieval: boolean;
  collectionName: string;
  temperature?: number;
  topP?: number;
  topK?: number;
  candidateCount?: number;
  candidatesField?: string;
  safetySettings?: GoogleAISafetySetting[] | VertexSafetySetting[];
  provider: GenerativeAIProvider;
  maxOutputTokens?: number;
}

// function getSafetySettings(): GoogleAISafetySetting[] | VertexSafetySetting[] | undefined {
//   const categories = [
//     'HARM_CATEGORY_HATE_SPEECH',
//     'HARM_CATEGORY_DANGEROUS_CONTENT',
//     'HARM_CATEGORY_HARASSMENT',
//     'HARM_CATEGORY_SEXUALLY_EXPLICIT',
//   ];

//   const settings = [];

//   for (const category of categories) {
//     if (process.env[category]) {
//       settings.push({
//         category,
//         threshold: process.env[category],
//       });
//     }
//   }

//   switch (process.env.GENERATIVE_AI_PROVIDER) {
//     case 'openai':
//       return undefined;
//     case 'vertex-ai':
//       return settings as VertexSafetySetting[];
//     case 'google-ai':
//       return settings as GoogleAISafetySetting[];
//     default:
//       throw new Error('Invalid Provider');
//   }
// }

const config: Config = {
  openai: {
    namespace: 'openai-chatbot',
    apiKey: process.env.OPENAI_API_KEY || '',
    model: process.env.MODEL || 'gpt-4-turbo',
    assistantId: process.env.OPENAI_ASSISTANT_ID || '',
  },
  vertex: {
    model: process.env.MODEL!,
  },
  googleAi: {
    model: process.env.MODEL!,
    apiKey: process.env.API_KEY,
  },
  context: process.env.CONTEXT,
  location: process.env.LOCATION!,
  projectId: process.env.PROJECT_ID!,
  instanceId: process.env.EXT_INSTANCE_ID!,
  collectionName: process.env.COLLECTION_NAME || 'users/{uid}/threads/{tid}/messages/{mid}',
  promptField: process.env.PROMPT_FIELD || 'prompt',
  responseField: process.env.RESPONSE_FIELD || 'response',
  orderField: process.env.ORDER_FIELD || 'createTime',
  enableDiscussionOptionOverrides:
    process.env.ENABLE_DISCUSSION_OPTION_OVERRIDES === 'yes',
  enableThreadRetrieval: process.env.ENABLE_THREAD_RETRIEVAL === 'yes',
  temperature: process.env.TEMPERATURE
    ? parseFloat(process.env.TEMPERATURE)
    : undefined,
  topP: process.env.TOP_P ? parseFloat(process.env.TOP_P) : undefined,
  topK: process.env.TOP_K ? parseInt(process.env.TOP_K) : undefined,
  maxOutputTokens: process.env.MAX_OUTPUT_TOKENS
    ? parseInt(process.env.MAX_OUTPUT_TOKENS)
    : undefined,
  candidateCount: process.env.CANDIDATE_COUNT
    ? parseInt(process.env.CANDIDATE_COUNT)
    : 1,
  candidatesField: process.env.CANDIDATES_FIELD || 'candidates',
  // safetySettings: getSafetySettings(),
  provider: process.env.GENERATIVE_AI_PROVIDER as GenerativeAIProvider,
};

export default config;
