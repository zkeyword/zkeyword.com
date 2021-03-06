import { Controller, Ctx, Get, Param, UseBefore, UseAfter } from 'routing-controllers'
import { minify } from 'html-minifier'
import * as rp from 'request-promise'
import { render } from '../utils/render'
import { url, title } from '../utils/config'
import { ErrorResponder } from '../middleware/errorMiddleware'

@Controller()
@UseBefore(ErrorResponder)
export class UserController {

    @Get('/')
    async getHome(@Ctx() ctx: any) {
        const homeData = await rp({ uri: `${url}/api/posts`, json: true })
        const ServerData = { url: ctx.req.url, homeData }
        await ctx.render('blog', {
            title,
            html: minify(render(ServerData, ctx.req.url)),
            ServerData
        })
        return ctx
    }

    @Get('/page/:page')
    async getPage(@Ctx() ctx: any, @Param('page') page: number) {
        const homeData = await rp({ uri: `${url}/api/posts/page/${page}`, json: true })
        const ServerData = { url: ctx.req.url, homeData }
        await ctx.render('blog', {
            title,
            html: minify(render(ServerData, ctx.req.url)),
            ServerData
        })
        return ctx
    }

    @Get('/post/:name')
    async getPost(@Ctx() ctx: any) {
        const postData = await rp({ uri: `${url}/api/posts/${ctx.params.name}`, json: true })
        const ServerData = { url: ctx.req.url, postData }
        await ctx.render('blog', {
            title: `${postData.post_title} - ${title}`,
            html: minify(render(ServerData, ctx.req.url)),
            ServerData
        })
        return ctx
    }

    @Get('/tag/:name')
    async getTag(@Ctx() ctx: any) {
        const ServerData = { url: ctx.req.url }
        await ctx.render('blog', {
            html: minify(render(ServerData, ctx.req.url)),
            ServerData
            // data: await postGetListService()
        })
        return ctx
    }

    @Get('/about')
    async getAbout(@Ctx() ctx: any) {
        const ServerData = { url: ctx.req.url }
        await ctx.render('blog', {
            html: minify(render(ServerData, ctx.req.url)),
            ServerData
            // data: await postGetListService()
        })
        return ctx
    }

    // @Get('/*')
    // async getNotFind(@Ctx() ctx: any) {
    //     // const ServerData = {url: ctx.req.url}
    //     // await ctx.render('test', {
    //     //     html: render(ServerData, ctx.req.url),
    //     //     ServerData
    //     //     // data: await postGetListService()
    //     // })
    //     return ctx
    // }
}