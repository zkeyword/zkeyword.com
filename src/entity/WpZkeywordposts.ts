import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm'

@Entity()
export class WpZkeywordposts {

    @PrimaryGeneratedColumn()
    ID: number

    @Column('bigint')
    post_author: number

    @Column('datetime')
    post_date: string

    @Column('datetime')
    post_date_gmt: string

    @Column('longtext')
    post_content: string

    @Column('text')
    post_title: string

    @Column()
    post_excerpt: string

    @Column({
        length: 20
    })
    post_status: string

    @Column({
        length: 20
    })
    comment_status: string

    @Column({
        length: 20
    })
    ping_status: string

    @Column({
        length: 200
    })
    post_name: string

    @Column()
    to_ping: string

    @Column('text')
    pinged: string

    @Column('datetime')
    post_modified: string

    @Column('datetime')
    post_modified_gmt: string

    @Column('text')
    post_content_filtered: string

    @Column('text')
    post_parent: string

    @Column('text')
    guid: string

    @Column('text')
    menu_order: number

    @Column({
        length: 20
    })
    post_type: string

    @Column({
        length: 20
    })
    post_mime_type: string

    @Column('bigint')
    comment_count: number
}