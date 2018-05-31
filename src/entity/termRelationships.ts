import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, PrimaryColumn } from 'typeorm'

@Entity()
export class TermRelationships {

    @PrimaryGeneratedColumn()
    object_id: number

    @PrimaryColumn('bigint')
    term_taxonomy_id: number

    @Column()
    term_order: number
}