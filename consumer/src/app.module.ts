import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserEventConsumer } from './consumer/user-event.consumer';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'user-kafka',
            brokers: ['broker1:9092', 'broker2:9093'],
          },
          consumer: {
            groupId: 'user-consumer-group',
          },
        },
      },
    ]),
  ],
  controllers: [AppController, UserEventConsumer],
  providers: [
    {
      provide: 'AppService',
      useClass: AppService,
    },
  ],
})
export class AppModule {}
