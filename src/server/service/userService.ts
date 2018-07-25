import { getManager } from 'typeorm'
import { User } from '../entity/user'

/* 登录 */
export async function loginService(username: string, password: string): Promise<any> {
    const UserRepository = getManager().getRepository(User)
    return await UserRepository
        .createQueryBuilder('user')
        .select(['user.username', 'post.password'])
        .where('user.username = :username', { username })
        .andWhere('user.password = :password', { password })
        .getOne()
}
