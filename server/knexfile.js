
import 'dotenv/config';

export default {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DATABASE_HOST,
      port: 5432,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB
    },
    migrations: {
      directory: './migrations'
    }
  },

  test: {
    client: 'pg',
    connection: {
      host: process.env.DATABASE_HOST,
      port: 5432,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.TEST_DATABASE_DB
    },
    migrations: {
      directory: './migrations'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    migrations: {
      directory: './migrations'
    }
  }
};
