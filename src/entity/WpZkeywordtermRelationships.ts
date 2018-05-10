import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm'

@Entity()
export class WpZkeywordtermRelationships {

    @PrimaryGeneratedColumn()
    object_id: number

    @Column('bigint')
    term_taxonomy_id: number

    @Column()
    term_order: number
}