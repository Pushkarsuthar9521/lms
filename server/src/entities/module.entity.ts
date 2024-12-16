import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('Modules')
export class Module {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column()
  description!: string
}
