import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, KafkaContext } from '@nestjs/microservices';

@Controller()
export class UserEventConsumer {
  @MessagePattern('added-to-user')
  handleCartEvent(@Payload() message: any, @Ctx() context: KafkaContext) {
    const originalMessage = context.getMessage();
    const topic = context.getTopic();

    let parsedValue: string | null;
    try {
      parsedValue = JSON.stringify(originalMessage.value);
    } catch (error) {
      console.error('メッセージのJSONパースに失敗しました:', error);
    }

    console.log('Userメッセージ受信:'); 
    console.log('トピック:', topic);
    console.log('キー:', originalMessage.key!.toString());
    console.log('値:', parsedValue!);
    console.log('ヘッダー:', originalMessage.headers);
  }
}
