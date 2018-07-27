import { getManager } from 'typeorm'
import { User } from '../entity/user'
// import { crypto } from '../utils/auth'

export async function getUserByUserNameService(username: string): Promise<any> {
    const UserRepository = getManager().getRepository(User)
    return await UserRepository
        .createQueryBuilder('user')
        .where('user.username = :username', { username })
        // .andWhere('user.password = :password', { password: crypto(password) })
        .getOne()
}

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
