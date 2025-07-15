import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { join } from 'path';
import * as schema from './schema';

// Create the database file in the project root
const dbPath = join(process.cwd(), 'database.sqlite');
const sqlite = new Database(dbPath);

export const db = drizzle(sqlite, { schema });

// Initialize the database with tables if they don't exist
export function initDatabase() {
  // Enable foreign keys
  sqlite.pragma('foreign_keys = ON');

  // Create tables if they don't exist
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      author_id INTEGER NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (author_id) REFERENCES users(id)
    );
  `);

  console.log('✅ Database initialized');
}
