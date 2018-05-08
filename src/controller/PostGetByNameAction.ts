import { Context } from 'koa'
import { getManager } from 'typeorm'
import { WpZkeywordposts } from '../entity/WpZkeywordposts'

/**
 * Loads all posts from the database.
 */
export async function PostGetByNameAction(context: Context) {

    // get a post repository to perform operations with post
    const postRepository = getManager().getRepository(WpZkeywordposts)

    console.log(context.params)

    // load all posts
    const posts = await postRepository.findOne({
        where: {
            'post_status': 'publish',
            'post_name': context.params.name
        },
        order: {
            'ID': 'DESC'
        }
    })

    // return loaded posts
    context.body = posts
}