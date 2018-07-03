import { Controller, Ctx, Get } from 'routing-controllers'
import * as rp from 'request-promise'
import { render } from '../utils/render'

@Controller()
export class UserController {

    @Get('/')
    async getHome(@Ctx() ctx: any) {
        const data = await rp('http://127.0.0.1:3001/api/posts')
        const ServerData = {url: ctx.req.url, data}
        await ctx.render('test', {
            html: render(ServerData, ctx.req.url),
            ServerData
        })
        return ctx
    }

    @Get('/page/:page')
    async getPage(@Ctx() ctx: any) {
        const ServerData = {url: ctx.req.url}
        await ctx.render('test', {
            html: render(ServerData, ctx.req.url),
            ServerData
            // data: await postGetListService()
        })
        return ctx
    }

    @Get('/post/:name')
    async getPost(@Ctx() ctx: any) {
        const ServerData = {url: ctx.req.url}
        await ctx.render('test', {
            html: render(ServerData, ctx.req.url),
            ServerData
            // data: await postGetListService()
        })
        return ctx
    }

    @Get('/tag/:name')
    async getTag(@Ctx() ctx: any) {
        const ServerData = {url: ctx.req.url}
        await ctx.render('test', {
            html: render(ServerData, ctx.req.url),
            ServerData
            // data: await postGetListService()
        })
        return ctx
    }

    @Get('/about')
    async getAbout(@Ctx() ctx: any) {
        const ServerData = {url: ctx.req.url}
        await ctx.render('test', {
            html: render(ServerData, ctx.req.url),
            ServerData
            // data: await postGetListService()
        })
        return ctx
    }

    @Get('/*')
    async getNotFind(@Ctx() ctx: any) {
        // const ServerData = {url: ctx.req.url}
        // await ctx.render('test', {
        //     html: render(ServerData, ctx.req.url),
        //     ServerData
        //     // data: await postGetListService()
        // })
        return ctx
    }
}