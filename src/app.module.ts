import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DrizzleMySqlModule } from '@knaadh/nestjs-drizzle-mysql2';
import * as schema from './db/schema';

@Module({
  imports: [
    DrizzleMySqlModule.registerAsync({
      tag: 'DB_DEV',
      useFactory() {
        return {
          mysql: {
            connection: 'client',
            config: {
              host: 'mysql',
              user: 'admin',
              password: 'admin',
              database: 'nest_app',
            },
          },
          config: { schema: { ...schema }, mode: 'default' },
        };
      },
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
