import { CreateUserDto } from '../dto/create-user.dto';

/**
 * Kafkaに送信するメッセージの形式
 * イベントカテゴリを明示的にしておくことで、どういった特性のメッセージなのかをはっきりさせる
 */
export interface AddedToUserStateEventMessage {
  type: string,
  user: {
    name: string,
    email: string,
  },
}
