import { getManager } from 'typeorm'
import { User } from '../entity/user'
import { crypto } from '../utils/auth'

/* 初始化用户 */
(async function init() {
    const userInfo = await getUserByIdService(1)
    if (!userInfo.ID) {
        await addUser({
            username: 'admin',
            password: crypto('123456'),
            name: 'admin',
            slug: 'admin'
        })
    }
})()

/* 根据用户名获取用户信息 */
export async function getUserByUserNameService(username: string): Promise<any> {
    const UserRepository = getManager().getRepository(User)
    return await UserRepository
        .createQueryBuilder('user')
        .where('user.username = :username', { username })
        .getOne()
}

/* 根据用户ID获取用户信息 */
export async function getUserByIdService(id: number) {
    const UserRepository = getManager().getRepository(User)
    return await UserRepository
        .createQueryBuilder('user')
        .where('user.ID = :id', { id })
        .getOne()
}

export async function addUser(req: any) {
    const UserRepository = getManager().getRepository(User)
    return await UserRepository
        .createQueryBuilder('user')
        .insert()
        .into(User)
        .values([
            {
                ...req
            }
        ])
        .execute()
}

export async function deleteUserByIdService() {

}

export async function modifyUserByIdService() {

}
