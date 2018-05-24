import { Controller, Ctx, Get, Param, Render } from 'routing-controllers'
import { postGetListService, postGetByNameService, postGetByTitleService } from '../service/wpPostService'

@Controller()
export class UserController {

    @Get('/posts')
    async getPostFirst( @Ctx() ctx: any) {
        return await postGetListService()
    }

    @Get('/posts/page/:pageIndex')
    async getPost( @Param('pageIndex') pageIndex: number) {
        return await postGetListService(pageIndex)
    }

    @Get('/posts/:name')
    async getPostByName( @Param('name') name: string) {
        return await postGetByNameService(name)
    }

    @Get('/posts/search/:name')
    async getPostByLinkTitle( @Param('name') name: string) {
        return await postGetByTitleService(name)
    }

    @Get('/posts/html')
    // @Render('test') // routing-controllers Render有bug
    async getHtml(@Ctx() ctx: any) {
        await ctx.render('test', {
            data: await postGetListService()
        })
        return ctx
    }
}