import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleMySqlModule } from '@knaadh/nestjs-drizzle-mysql2';
import * as schema from './db/schema';

@Module({
  imports: [
    DrizzleMySqlModule.register({
      tag: 'DB_DEV',
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
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
