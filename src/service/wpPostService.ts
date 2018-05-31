import { getManager } from 'typeorm'
import { Posts } from '../entity/posts'

/* 根据文章别名获取文章 */
export async function postGetByNameService(name: string): Promise<any> {
    const postRepository = getManager().getRepository(Posts)
    return await postRepository
        .createQueryBuilder('post')
        .select(['post.ID', 'post.post_title', 'post.post_name', 'post.post_modified_gmt', 'post.post_content'])
        .where('post.post_name = :name', { name })
        .andWhere('post.post_status = :status', { status: 'publish' })
        .getMany()
}

/* 根据文章标题关键词获取文章列表 */
export async function postGetByTitleService(title: string): Promise<any> {
    const postRepository = getManager().getRepository(Posts)
    return await postRepository
        .createQueryBuilder('post')
        .select(['post.ID', 'post.post_title', 'post.post_name', 'post.post_content'])
        .where('post.post_title like :name', { name: '%' + title + '%' })
        .andWhere('post.post_status = :status', { status: 'publish' })
        .getMany()
}

/* 获取全部文章列表 */
export async function postGetListService(pageIndex: number = 0, pageSize: number = 10): Promise<any> {
    const postRepository = getManager().getRepository(Posts)
    return await postRepository
        .createQueryBuilder('post')
        .select(['post.ID', 'post.post_title', 'post.post_name', 'post.post_content'])
        .where('post.post_status = :status', { status: 'publish' })
        .offset(pageIndex * pageSize)
        .limit(pageSize)
        .orderBy('post.ID', 'DESC')
        .getMany()
}

/* 根据tag关键词获取文章列表 */
export async function postByTagNameService(tag: string, pageIndex: number = 0, pageSize: number = 10): Promise<any> {
    const postRepository = getManager().getRepository(Posts)
    const posts = await postRepository
        .createQueryBuilder('post')
        .select(['post.ID', 'post.post_title', 'post.post_name', 'post.post_content'])
        .where('post.post_status = :status', { status: 'publish' })
        .offset(pageIndex * pageSize)
        .limit(pageSize)
        .orderBy('post.ID', 'DESC')
        .getMany()
    return posts
}