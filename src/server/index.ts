import 'reflect-metadata'
import { join } from 'path'
import * as fs from 'fs'
import * as Koa from 'koa'
import { createConnection } from 'typeorm'
import { useKoaServer } from 'routing-controllers'
import * as bodyParser from 'koa-bodyparser'
import * as logger from 'koa-logger'
import * as json from 'koa-json'
import * as views from 'koa-views'
import * as helmet from 'koa-helmet'
import * as koaStatic from 'koa-static'
import * as koaSession from 'koa-session'

const port = parseInt(process.env.NODE_ZKEYWORD_PORT, 10) || 3001

createConnection()
    .then(async () => {
        const server = new Koa()
        server.use(helmet())
        server.use(json())
        server.use(logger())
        server.use(bodyParser())
        server.use(koaStatic(`${__dirname}/../../public`))
        server.use(views(join(__dirname, '../../public'), {
            extension: 'html',
            map: { html: 'ejs' }
        }))
        server.keys = ['zkeyword']
        server.use(koaSession({
            key: 'koa:sess',
            maxAge: 86400000,
            overwrite: true,
            httpOnly: true,
            signed: true,
            rolling: false,
            renew: false
        }, server))

        // 绑定路由
        const app = useKoaServer(server, {
            controllers: [__dirname + '/controllers/*{.js,.ts,.tsx}'],
            // defaultErrorHandler: false
        })

        app.listen(port)
        console.log(`Koa application is up and running on port ${port}`)
    })
    .catch(err => {
        console.log(`数据库连接失败`, err)
    })
