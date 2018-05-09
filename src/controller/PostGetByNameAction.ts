import { Context } from 'koa'
import { postGetByNameService } from '../service/wpPostService'

export async function PostGetByNameAction(context: Context) {
    const name = context.params.name
    context.body = await postGetByNameService(name)
}