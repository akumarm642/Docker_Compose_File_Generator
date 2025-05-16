import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/User';
import dotenv from 'dotenv';
import { Project } from './entities/Project';

dotenv.config();


export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,  // Automatically creates tables from your entities
  logging: false,     // Disable query logging (you can enable it for debugging)
  entities: [User, Project],
  migrations: [],
  subscribers: [],
});
