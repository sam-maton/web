import { users } from './schema';
import { db } from './database';

async function seedData() {
  const newUsers: (typeof users.$inferInsert)[] = [
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Smith', email: 'jane@example.com' },
    { name: 'Bob Johnson', email: 'bob@example.com' },
  ];

  const storedUsers = await db.insert(users).values(newUsers).returning();

  return { message: 'Sample data created successfully', users: storedUsers };
}

seedData();
