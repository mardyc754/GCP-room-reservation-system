import { Injectable, Inject } from '@nestjs/common';
import { PubSub } from '@google-cloud/pubsub';

import { PUB_SUB } from './pubsub.module-definition';

type Message = {
  to: string;
  subject: string;
  message: string;
};

@Injectable()
export class PubSubService {
  constructor(@Inject(PUB_SUB) private readonly pubSubClient: PubSub) {}

  /**
   * Publish a message to a Pub/Sub topic.
   * @param topicName - The name of the Pub/Sub topic.
   * @param message - The message to publish.
   */
  async publishMessage(message: Message): Promise<string> {
    try {
      const dataBuffer = Buffer.from(JSON.stringify(message));
      const messageId = await this.pubSubClient
        .topic('send-email')
        .publishMessage({ data: dataBuffer });
      return messageId;
    } catch (error) {
      console.error('Error publishing message:', error);
      throw error;
    }
  }
}
