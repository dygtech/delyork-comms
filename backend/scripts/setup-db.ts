import { Client } from 'pg';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environmental variables from the .env file in the backend root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const dbConfig = {
  host: process.env.DATABASE_HOST || '127.0.0.1',
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  user: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
};

async function setupDatabase() {
  const targetDb = process.env.DATABASE_NAME || 'dycomms_cms';
  
  // Connect to the system default database 'postgres' to perform database check
  const client = new Client({
    ...dbConfig,
    database: 'postgres',
  });

  try {
    console.log(`Attempting to connect to PostgreSQL at ${dbConfig.host}:${dbConfig.port} as user "${dbConfig.user}"...`);
    await client.connect();
    console.log('Connected to database server.');

    // Query system catalog to check database existence
    const res = await client.query('SELECT 1 FROM pg_database WHERE datname = $1', [targetDb]);

    if (res.rowCount === 0) {
      console.log(`Database "${targetDb}" does not exist. Creating...`);
      await client.query(`CREATE DATABASE "${targetDb}"`);
      console.log(`Database "${targetDb}" created successfully!`);
    } else {
      console.log(`Database "${targetDb}" already exists.`);
    }
  } catch (err) {
    console.error('Failed to set up PostgreSQL database:', err);
    console.error('Please ensure PostgreSQL is running locally and credentials in your .env are correct.');
    process.exit(1);
  } finally {
    await client.end();
  }
}

setupDatabase();
