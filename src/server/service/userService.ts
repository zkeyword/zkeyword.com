import { getManager } from 'typeorm'
import { User } from '../entity/user'

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

export async function addUser() {

}

export async function deleteUserByIdService() {

}

export async function modifyUserByIdService() {

}
