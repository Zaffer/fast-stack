import OpenAI from 'openai';
import { ChatResponse } from './base_class';
import config from '../config';
import {
  MessageDelta,
  TextContentBlock,
  TextDelta,
} from 'openai/resources/beta/threads/messages';
import { DocumentData, DocumentSnapshot } from 'firebase-admin/firestore';
import { Change, FirestoreEvent } from 'firebase-functions/v2/firestore';

export class AssistantsDiscussionClient {
  openai: OpenAI;

  constructor() {
    // super();
    if (!config.openai.apiKey) {
      throw new Error('API key required.');
    }
    if (!config.openai.model) {
      throw new Error('Model name required.');
    }
    // this.modelName = config.openai.model;
    this.openai = new OpenAI({ apiKey: config.openai.apiKey });
  }

  // creates a thread on OpenAI to attach messages to
  async createThread() {
    const thread = await this.openai.beta.threads.create({
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

  // creats a message on the thread and runs the assistant for a response
  async send(
    messageContent: string,
    event: FirestoreEvent<
      Change<DocumentSnapshot<DocumentData>> | undefined,
      Record<string, string>
    >
  ): Promise<ChatResponse> {
    if (!this.openai) {
      throw new Error('client not initialized.');
    }

    if (!event) {
      console.log('message data:', event);
      throw new Error('document does not exist');
    }

    // create message on OpenAI thread
    const message = await this.openai.beta.threads.messages.create(
      event.params.tid,
      {
        role: 'user',
        content: messageContent,
      }
    );
    console.log('created message: ' + message);

    let response = '';
    const run = this.openai.beta.threads.runs
      .stream(event.params.tid, {
        assistant_id: config.openai.assistantId,
      })
      .on('runStepCreated', (step) => console.log('runStepCreated: ', step))
      .on('textDelta', (delta: TextDelta, snapshot) => {
        // console.log('textDelta delta: ', delta);
        console.log('textDelta snapshot: ', snapshot);
        // stream message deltas to Firestore response field here
      })
      .on('messageDone', (message) => {
        console.log('messageDone: ', message)
        // TODO get the actual final response message properly here.
        // example output:
        // messageDone:  {
        //   firebase_container  | >    id: 'msg_123',
        //   firebase_container  | >    object: 'thread.message',
        //   firebase_container  | >    created_at: 1714979258,
        //   firebase_container  | >    assistant_id: 'asst_132',
        //   firebase_container  | >    thread_id: 'thread_123',
        //   firebase_container  | >    run_id: 'run_123',
        //   firebase_container  | >    status: 'completed',
        //   firebase_container  | >    incomplete_details: null,
        //   firebase_container  | >    incomplete_at: null,
        //   firebase_container  | >    completed_at: 11111,
        //   firebase_container  | >    role: 'assistant',
        //   firebase_container  | >    content: [ { type: 'text', text: [Object] } ],
        //   firebase_container  | >    attachments: [],
        //   firebase_container  | >    metadata: {}
        //   firebase_container  | >  }
        response = (message.content[-1] as TextContentBlock).text.value;
      }
    )
      .on('end', () => console.log('end'))
      .on('error', (error) => console.log(error));

    const result = await run.finalRun();
    console.log('run finished with status: ' + result.status);

    if (result.status == 'completed') {
      const messages = await this.openai.beta.threads.messages.list(
        event.params.tid
      );
      for (const message of messages.getPaginatedItems()) {
        console.log(message);
      }
    }

    return {
      response: response,
    };
  }
}
