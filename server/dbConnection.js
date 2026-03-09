import 'dotenv/config';
import knex from 'knex';
import config from './knexfile.js';

// Database connection setup

const environment = process.env.NODE_ENV || 'development';

export const db = knex(config[environment]);