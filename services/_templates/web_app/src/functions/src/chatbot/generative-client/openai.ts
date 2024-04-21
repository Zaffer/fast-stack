import OpenAI from 'openai';
import { ChatResponse, DiscussionClient } from './base_class';
import config from '../config';

// interface AssistantChatOptions {
//   model: string;
//   temperature?: number;
//   candidateCount?: number;
//   topP?: number;
//   topK?: number;
//   maxOutputTokens?: number;
//   projectId: string;
//   location: string;
//   context?: string;
//   safetySettings: SafetySetting[];
// }

enum Role {
  USER = 'user',
  ASSISTANT = 'assistant',
}

type ApiMessage = {
  role: string;
  content: string;
};

export class AssistantsDiscussionClient extends DiscussionClient<
  OpenAI,
  any,
  any
> {
  constructor() {
    super();
    if (!config.openai.apiKey) {
      throw new Error('API key required.');
    }
    if (!config.openai.model) {
      throw new Error('Model name required.');
    }
    this.modelName = config.openai.model;
    this.client = new OpenAI({ apiKey: config.openai.apiKey });
  }

  // send(messageContent: string, options: any): Promise<ChatResponse> {
  //   // options has thread ID.

  //   console.log('Sending message: ' + messageContent);
  //   console.log('Options: ' + JSON.stringify(options));
  //   return this.generateResponse();
  // }

  async createThread() {
    const thread = await this.client.beta.threads.create({
      messages: [
        {
          role: 'user',
          content:
            '"I need to solve the equation `3x + 11 = 14`. Can you help me?"',
        },
      ],
    });
    
    return thread;
  }

  createApiMessage(
    messageContent: string,
    role: 'user' | 'model' = 'user'
  ): ApiMessage {
    const apiRole = role === 'user' ? Role.USER : Role.ASSISTANT;
    return {
      role: apiRole,
      content: messageContent,
    };
  }
}

export class _AssistantsDiscussionClient extends DiscussionClient<
  OpenAI,
  any,
  any
> {
  async _generateResponse() {
    const openai = new OpenAI({ apiKey: config.openai.apiKey });
    const assistant = await openai.beta.assistants.create({
      model: 'gpt-4-turbo',
      name: 'Math Tutor',
      instructions:
        'You are a personal math tutor. Write and run code to answer math questions.',
      // tools = [],
    });

    let assistantId = assistant.id;
    console.log('Created Assistant with Id: ' + assistantId);

    const thread = await openai.beta.threads.create({
      messages: [
        {
          role: 'user',
          content:
            '"I need to solve the equation `3x + 11 = 14`. Can you help me?"',
        },
      ],
    });

    let threadId = thread.id;
    console.log('Created thread with Id: ' + threadId);

    const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: assistantId,
      additional_instructions:
        'Please address the user as Jane Doe. The user has a premium account.',
    });

    console.log('Run finished with status: ' + run.status);

    if (run.status == 'completed') {
      const messages = await openai.beta.threads.messages.list(thread.id);
      for (const message of messages.getPaginatedItems()) {
        console.log(message);
      }
    }

    return {
      response: 'Success',
      candidates: [],
      history: [],
    };
  }

  async send(messageContent: string, options: any): Promise<ChatResponse> {
    console.log('Sending message: ' + messageContent);
    console.log('Options: ' + JSON.stringify(options));
    return await this._generateResponse();
  }
}
