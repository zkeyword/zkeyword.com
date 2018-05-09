import { Context } from 'koa'
import { postGetByTitleService } from '../service/wpPostService'

export async function PostGetlikeAction(context: Context) {
    const name = context.params.name
    context.body = await postGetByTitleService(name)
}