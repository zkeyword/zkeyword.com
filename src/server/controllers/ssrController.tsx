import { Controller, Ctx, Get } from 'routing-controllers'
// import { postGetListService } from '../service/wpPostService'
import { render } from '../utils/render'

@Controller()
export class UserController {

    @Get('/ssr/html')
    async getHtml(@Ctx() ctx: any) {
        const ServerData = {url: ctx.req.url}
        await ctx.render('test', {
            html: render(ServerData, ctx.req.url),
            ServerData
            // data: await postGetListService()
        })
        return ctx
    }

    @Get('/ssr/html2')
    async getHtml2(@Ctx() ctx: any) {
        const ServerData = {url: ctx.req.url}
        await ctx.render('test', {
            html: render(ServerData, ctx.req.url),
            ServerData
            // data: await postGetListService()
        })
        return ctx
    }
}