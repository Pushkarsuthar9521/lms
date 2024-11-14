import dotenv from 'dotenv'
import { DataSource } from 'typeorm'

dotenv.config()

export const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  // host: 'aws-0-ap-south-1.pooler.supabase.com',
  // port: 6543,
  // username: 'postgres.fiotjokzytrncjwgadzq',
  // password: 'iZTgLomYCiAsxLM9',
  // database: 'postgres',
  synchronize: true,
  logging: false,
  entities: ['src/entities/*.ts'],
  subscribers: [],
  migrations: []
})

export const connectToDatabase = async () => {
  try {
    await dataSource.initialize()
    console.log('Database connected........')
  } catch (error) {
    console.log('Error during DataSource initialization', error)
  }
}
