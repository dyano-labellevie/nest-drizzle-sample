import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka, KafkaHeaders } from '@nestjs/microservices';
import { KafkaService } from '../../kafka.service';
import { ThisError } from '../../error/this-error';
import { AddedToUserStateEventMessage } from './added-to-user-state.event.message';
import { randomUUID } from 'crypto';

/**
 * KafkaのトピックID
 * 別の場所でまとめて定義しておく方が良いと考えている
 */
const topicIds = {
  ADDED_TO_USER: 'added-to-user',
};

/**
 * ユーザーイベントをKafkaに送信するProducer
 */
@Injectable()
export class UserEventProducer extends KafkaService {
  public constructor(
    @Inject('KAFKA_SERVICE') kafkaClient: ClientKafka,
  ) {
    super([topicIds.ADDED_TO_USER], kafkaClient);
  }

  public async publish(message: AddedToUserStateEventMessage): Promise<void | ThisError> {
    try {
      switch (message.type) {
        case 'ADDED_TO_USER':
          const uuid = randomUUID();
          // example: using the emit() method.
          this.kafkaClient.emit(topicIds.ADDED_TO_USER, {
            key: uuid,
            value: JSON.stringify(message),
            sample: 'emit method',
          });

          // example: using the send() method.
          const res = await this.kafkaClient
            .send(topicIds.ADDED_TO_USER, {
              messages: [
                {
                  key: uuid,
                  value: JSON.stringify(message),
                  headers: {
                    [KafkaHeaders.CORRELATION_ID]: randomUUID(),
                    [KafkaHeaders.REPLY_TOPIC]: topicIds.ADDED_TO_USER,
                  },
                },
              ],
            })
            .toPromise();

          console.log('response: ', res);
          break;

        default:
          console.log('Unknown message type: ', message.type);
      }
    } catch (error) {
      console.error('Error while sending message: ', error);
    }
  }
}
