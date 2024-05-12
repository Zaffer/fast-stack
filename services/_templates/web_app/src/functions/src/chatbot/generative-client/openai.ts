import OpenAI from 'openai';
import { ChatResponse } from './base_class';
import config from '../config';
import {
  Message,
  Text,
  // MessageDelta,
  TextContentBlock,
  TextDelta,
} from 'openai/resources/beta/threads/messages';
import { DocumentData, DocumentSnapshot } from 'firebase-admin/firestore';
import { Change, FirestoreEvent } from 'firebase-functions/v2/firestore';
import { FirestoreField } from '../firestore-onwrite-processor/common';

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
    if (!this.openai)
      throw new Error('client not initialized.');

    if (!event)
      throw new Error('event does not exist');

    if (!event.data)
      throw new Error('event data does not exist');

    // create message on OpenAI thread
    const message = await this.openai.beta.threads.messages.create(
      event.params.tid,
      {
        role: 'user',
        content: messageContent,
      }
    );

    // update Firestore message document with OpenAI message ID
    event.data.after.ref.update({
      msg_id: message.id,
    });
    console.log('created message OpenAI with ID: ' + message.id);

    // run assistant on OpenAI thread
    let response = undefined;
    const run = this.openai.beta.threads.runs
      .stream(event.params.tid, {
        assistant_id: config.openai.assistantId,
      })
      .on('runStepCreated', (step) => console.log('runStepCreated: ', step))
      .on('textDelta', (delta: TextDelta, snapshot: Text) => {
        console.log('textDelta snapshot: ', snapshot.value);
        event.data?.after.ref.update({
          response: snapshot.value,
        } as Record<string, FirestoreField>);
      })
      .on('messageDone', (message: Message) => {
        response = (message.content[0] as TextContentBlock).text.value;
        console.log('messageDone text: ', response)
        event.data?.after.ref.update({
          response: response,
        } as Record<string, FirestoreField>);
      })
      .on('end', () => console.log('end'))
      .on('error', (error) => console.log(error));

    const result = await run.finalRun();
    console.log('run finalised with status: ' + result.status);

    if (result.status == 'completed' && response) {
      return {
        response: response,
      };
    } else {
      return {
        response: 'Sorry, there appearst to be an issue. Please inform support.'
      }
    }
  }
}
