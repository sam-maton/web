import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { user } from '../../database/schema';
import type { db as DatabaseType } from '../../database/database';

@Injectable()
export class UsersService {
  constructor(@Inject('DATABASE') private db: typeof DatabaseType) {}

  async getAllUsers() {
    return await this.db.select().from(user);
  }

  async getUserById(id: string) {
    const result = await this.db.select().from(user).where(eq(user.id, id));
    return result[0];
  }
}
