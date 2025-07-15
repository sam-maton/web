import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { users } from '../database/schema';
import type { db as DatabaseType } from '../database/database';

@Injectable()
export class UsersService {
  constructor(@Inject('DATABASE') private db: typeof DatabaseType) {}

  async getAllUsers() {
    return await this.db.select().from(users);
  }

  async getUserById(id: number) {
    const result = await this.db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async createUser(userData: { name: string; email: string }) {
    const result = await this.db.insert(users).values(userData).returning();
    return result[0];
  }
}
