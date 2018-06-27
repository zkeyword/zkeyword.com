import { Controller, Ctx, Get } from 'routing-controllers'
// import { postGetListService } from '../service/wpPostService'
import * as React from 'react'
import { renderToNodeStream, renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from '../../client/router'

@Controller()
export class UserController {

    @Get('/ssr/html')
    async getHtml(@Ctx() ctx: any) {
        const ServerData = {url: ctx.req.url}
        const html = renderToString(
            <StaticRouter context={{}} location={ctx.req.url}>
                <App InitData={ServerData} />
            </StaticRouter>
        )
        await ctx.render('test', {
            html: html,
            ServerData
            // data: await postGetListService()
        })
        return ctx
    }

    @Get('/ssr/html2')
    async getHtml2(@Ctx() ctx: any) {
        const ServerData = {url: ctx.req.url}
        const html = renderToString(
            <StaticRouter context={{}} location={ctx.req.url}>
                <App InitData={ServerData} />
            </StaticRouter>
        )
        await ctx.render('test', {
            html: html,
            ServerData
            // data: await postGetListService()
        })
        return ctx
    }
}