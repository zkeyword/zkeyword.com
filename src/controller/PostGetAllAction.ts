import { Context } from 'koa'
import { getManager } from 'typeorm'
import { WpZkeywordposts } from '../entity/WpZkeywordposts'

/**
 * Loads all posts from the database.
 */
export async function postGetAllAction(context: Context) {

    // get a post repository to perform operations with post
    const postRepository = getManager().getRepository(WpZkeywordposts)

    // load all posts
    const posts = await postRepository.find({
        select: ['post_status', 'ID', 'post_title', 'post_content'],
        where: {
            'post_status': 'publish'
        },
        order: {
            'ID': 'DESC'
        }
    })

    // return loaded posts
    context.body = posts
}