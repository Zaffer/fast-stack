import config, { GenerativeAIProvider } from '../config';
import { DiscussionClient } from './base_class';
import { GeminiDiscussionClient } from './google_ai';
import { VertexDiscussionClient } from './vertex_ai';
import { VertexAI } from '@google-cloud/vertexai';
import { GoogleGenerativeAI } from '@google/generative-ai';
// import { AssistantsDiscussionClient } from './openai';
import OpenAI from 'openai';

type Client = VertexAI | GoogleGenerativeAI | OpenAI;

// TODO fix any
export const getGenerativeClient = (): DiscussionClient<Client, any, any> => {
  switch (config.provider as GenerativeAIProvider) {
    // case 'openai':
    //   return new AssistantsDiscussionClient();
    case 'google-ai':
      if (!config.googleAi.model) throw new Error('Gemini model not set');

      return new GeminiDiscussionClient({
        apiKey: config.googleAi.apiKey,
        modelName: config.googleAi.model,
      });
    case 'vertex-ai':
      return new VertexDiscussionClient({
        modelName: config.vertex.model,
      });
    default:
      throw new Error('Invalid provider');
  }
};
