import { getManager } from 'typeorm'
import { WpZkeywordposts } from '../entity/WpZkeywordposts'

export async function postGetByNameService(name: String) {
    const postRepository = getManager().getRepository(WpZkeywordposts)
    const posts = await postRepository.findOne({
        where: {
            'post_status': 'publish',
            'post_name': name
        },
        order: {
            'ID': 'DESC'
        }
    })
    return posts
}