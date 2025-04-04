import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { eq } from 'drizzle-orm';
import { MySql2Database } from 'drizzle-orm/mysql2';
import * as schema from '../db/schema';

@Injectable()
export class UserService {
  constructor(
    @Inject('DB_DEV') private drizzle: MySql2Database<typeof schema>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.drizzle.insert(schema.user).values(createUserDto);
  }

  async findAll() {
    return await this.drizzle.query.user.findMany();
  }

  async findOne(id: number) {
    return await this.drizzle.query.user.findFirst({
      with: {
        id,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.drizzle
      .update(schema.user)
      .set(updateUserDto)
      .where(eq(schema.user.id, id));
  }

  async remove(id: number) {
    return await this.drizzle
      .delete(schema.user)
      .where(eq(schema.user.id, id))
      .limit(1);
  }
}
