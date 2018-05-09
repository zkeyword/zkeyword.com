import 'reflect-metadata'
import { createConnection } from 'typeorm'
import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as bodyParser from 'koa-bodyparser'
import { AppRoutes } from './routes'
import { join } from 'path'
import * as next from 'next'
import * as logger from 'koa-logger'
import * as json from 'koa-json'

const port = parseInt(process.env.PORT, 10) || 4000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
    .prepare()
    .then(async () => {
        try {
            await createConnection()
        } catch {
            console.log(`数据库连接失败`)
        }
        const server = new Koa()
        const router = new Router()

        // register all application routes
        AppRoutes.forEach(route => {
            router.get('/', async ctx => {
                await handle(ctx.req, ctx.res)
                ctx.respond = false
            })
            router.get('/_next/*', async ctx => {
                await handle(ctx.req, ctx.res)
                ctx.respond = false
            })
            router[route.method](route.path, route.action)
            return router
        })

        // run app
        server.use(async (ctx, next) => {
            ctx.res.statusCode = 200
            await next()
        })
        server.use(json())
        server.use(logger())
        server.use(bodyParser())
        server.use(router.routes())
        server.use(router.allowedMethods())
        server.listen(port)

        console.log(`Koa application is up and running on port ${port}`)
    })
