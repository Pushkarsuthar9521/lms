import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('Courses')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column()
  description!: string

  @Column()
  price!: number

  @Column()
  rating!: number
}
