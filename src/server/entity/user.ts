import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    ID: number

    @Column('text')
    username: string

    @Column('text')
    password: string

    @Column('text')
    name: string

    @Column('text')
    slug: string
}