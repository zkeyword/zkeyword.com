import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Terms {

    @PrimaryGeneratedColumn()
    term_id: number

    @Column('text')
    name: string

    @Column('text')
    slug: string

    @Column('bigint')
    term_group: string
}