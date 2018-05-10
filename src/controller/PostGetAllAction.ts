import { Context } from 'koa'
import { postGetListService } from '../service/wpPostService'

export async function postGetAllAction(context: Context) {
    context.body = await postGetListService(context.params.pageIndex)
}
