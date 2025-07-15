import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { users, posts } from '../database/schema';
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

  async getUsersWithPosts() {
    return await this.db
      .select({
        user: users,
        posts: posts,
      })
      .from(users)
      .leftJoin(posts, eq(users.id, posts.authorId));
  }

  async seedData() {
    // Check if data already exists
    const existingUsers = await this.db.select().from(users);
    if (existingUsers.length > 0) {
      return { message: 'Data already exists' };
    }

    // Insert sample users
    const newUsers = await this.db
      .insert(users)
      .values([
        { name: 'John Doe', email: 'john@example.com' },
        { name: 'Jane Smith', email: 'jane@example.com' },
        { name: 'Bob Johnson', email: 'bob@example.com' },
      ])
      .returning();

    // Insert sample posts
    await this.db.insert(posts).values([
      {
        title: 'Getting Started with Drizzle',
        content: 'Drizzle is a modern TypeScript ORM...',
        authorId: newUsers[0].id,
      },
      {
        title: 'Building APIs with NestJS',
        content: 'NestJS provides a solid foundation...',
        authorId: newUsers[1].id,
      },
      {
        title: 'SQLite for Small Projects',
        content: 'SQLite is perfect for development...',
        authorId: newUsers[0].id,
      },
    ]);

    return { message: 'Sample data created successfully', users: newUsers };
  }
}
