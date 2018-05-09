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

export async function postGetByTitleService(title: String) {
    const postRepository = getManager().getRepository(WpZkeywordposts)
    const posts = await postRepository
        .createQueryBuilder('post')
        .where('post.post_title like :name', { name: '%' + title + '%' })
        .getMany()
    return posts
}