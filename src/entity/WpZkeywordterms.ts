import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm'

@Entity()
export class WpZkeywordterms {

    @PrimaryGeneratedColumn()
    term_id: number

    @Column('bigint')
    name: number

    @Column('datetime')
    slug: string

    @Column('bigint')
    term_group: string
}