import { Controller, Ctx, Get } from 'routing-controllers'
// import * as next from 'next'

@Controller()
export class UserController {

    // @Get('/')
    // async getHome( @Ctx() ctx: any) {
    //     await global.handle(ctx.req, ctx.res)
    //     ctx.respond = false
    // }

    // @Get('/_next/*')
    // async getScript( @Ctx() ctx: any) {
    //     await global.handle(ctx.req, ctx.res)
    //     ctx.respond = false
    // }

    // @Get('/page/:page')
    // async getHomePage( @Ctx() ctx: any) {
    //     ctx.params.isPage = true
    //     if (isNaN(parseInt(ctx.params.page, 10))) return ctx.res.statusCode = 404
    //     if (Number(ctx.params.page) <= 0) ctx.redirect('/')
    //     ctx.res.statusCode = 200
    //     await global.app.render(ctx.req, ctx.res, '/', ctx.params)
    // }

    // @Get('/post/:name')
    // async getPost( @Ctx() ctx: any) {
    //     ctx.res.statusCode = 200
    //     await global.app.render(ctx.req, ctx.res, '/post', ctx.params)
    // }

}