import { getManager } from 'typeorm'
import { Posts } from '../entity/posts'

/* 根据文章别名获取文章 */
export async function postGetByNameService(name: string): Promise<any> {
    const postRepository = getManager().getRepository(Posts)
    return await postRepository
        .createQueryBuilder('post')
        .select(['post.ID', 'post.post_title', 'post.post_name', 'post.post_modified_gmt', 'post.post_content', 'post.post_excerpt'])
        .where('post.post_name = :name', { name })
        .andWhere('post.post_status = :status', { status: 'publish' })
        .getOne()
}

/* 根据文章标题关键词获取文章列表 */
export async function postGetByTitleService(title: string): Promise<any> {
    const postRepository = getManager().getRepository(Posts)
    return await postRepository
        .createQueryBuilder('post')
        .select(['post.ID', 'post.post_title', 'post.post_name', 'post.post_modified_gmt', 'post.post_content', 'post.post_excerpt'])
        .where('post.post_title like :name', { name: '%' + title + '%' })
        .andWhere('post.post_status = :status', { status: 'publish' })
        .getMany()
}

/* 获取全部文章列表 */
export async function postGetListService(pageIndex: number = 1, pageSize: number = 10): Promise<any> {
    const postRepository = getManager().getRepository(Posts)
    const list = await postRepository
        .createQueryBuilder('post')
        .select(['post.ID', 'post.post_title', 'post.post_name', 'post.post_modified_gmt', 'post.post_content', 'post.post_excerpt'])
        .where('post.post_status = :status', { status: 'publish' })
        .offset((pageIndex - 1) * pageSize)
        .limit(pageSize)
        .orderBy('post.ID', 'DESC')
        .getMany()
    const total = await postRepository
        .count({
            where: {
                post_status: 'publish'
            },
            cache: true
        })
    return {
        list,
        pageIndex,
        pageSize,
        total
    }
}

/* 根据tag关键词获取文章列表 */
export async function postByTagNameService(tag: string, pageIndex: number = 0, pageSize: number = 10): Promise<any> {
    const posts = getManager().query(`
        SELECT *
            FROM wp_zkeywordterms t, wp_zkeywordterm_relationships r, wp_zkeywordposts p
            WHERE t.slug = '${tag}'
            AND t.term_id = r.term_taxonomy_id
            AND r.object_id = p.ID
    `)
    // const postRepository = getManager().getRepository(Posts)
    // const posts = await postRepository
    //     .createQueryBuilder('post')
    //     .leftJoinAndSelect('terms.term_id', 'post.ID')
    //     .select(['post.ID', 'post.post_title', 'post.post_name', 'post.post_content'])
    //     .where('post.post_title like :name', { name: '%' + tag + '%' })
    //     .andWhere('post.post_status = :status', { status: 'publish' })
    //     .offset(pageIndex * pageSize)
    //     .limit(pageSize)
    //     .orderBy('post.ID', 'DESC')
    //     .getMany()
    return posts
}