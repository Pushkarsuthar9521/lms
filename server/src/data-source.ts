import { DataSource } from 'typeorm'

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'aws-0-ap-south-1.pooler.supabase.com',
  port: 6543,
  username: 'postgres.moacbsqsdqdzlemfyylf',
  password: 'pushkar@TDC1',
  database: 'postgres',
  synchronize: true,
  logging: true,
  entities: ['src/entity/*.ts'],
  subscribers: [],
  migrations: []
})
