import { getManager } from 'typeorm'
import { User } from '../entity/user'
import { crypto } from '../utils/auth'

/* 初始化用户ID为1的用户管理员  -- 不需要可删除 */
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
export async function getUserByIdService(id: number): Promise<any> {
    const UserRepository = getManager().getRepository(User)
    return await UserRepository
        .createQueryBuilder('user')
        .where('user.ID = :id', { id })
        .getOne()
}

/* 添加用户 */
export async function addUser(req: any): Promise<any> {
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

/* 删除用户 */
export async function deleteUserByIdService(id: number): Promise<any> {
    const UserRepository = getManager().getRepository(User)
    return await UserRepository
        .createQueryBuilder('user')
        .delete()
        .from(User)
        .where('ID = :id', { id })
        .execute()
}

/* 修改用户 */
export async function ModifyUserByIDService(id: number, req: any): Promise<any> {
    const UserRepository = getManager().getRepository(User)
    return await UserRepository
        .createQueryBuilder('user')
        .update(User)
        .set({
            ...req
        })
        .where('ID = :id', { id })
        .execute()
}
