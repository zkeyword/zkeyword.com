import 'reflect-metadata'
import { join } from 'path'
import * as fs from 'fs'
import * as Koa from 'koa'
import { createConnection } from 'typeorm'
import {  useKoaServer } from 'routing-controllers'
import * as bodyParser from 'koa-bodyparser'
import * as logger from 'koa-logger'
import * as json from 'koa-json'
import * as views from 'koa-views'
import * as helmet from 'koa-helmet'
import * as koaStatic from 'koa-static'

const port = parseInt(process.env.PORT, 10) || 3001
const dev = process.env.NODE_ENV !== 'production'

createConnection()
    .then(async () => {
        const server = new Koa()

        server.use(helmet())
        server.use(json())
        server.use(logger())
        server.use(bodyParser())
        server.use(koaStatic(`${__dirname}/../../public`))
        server.use(views(join(__dirname, '../../views'), {
            extension: 'html',
            map: { html: 'ejs' }
        }))

        // 绑定路由
        const app = useKoaServer(server, {
            controllers: [__dirname + '/controllers/*{.js,.ts,.tsx}']
        })

        app.listen(port)
        fs.writeFileSync(join(__dirname, '../../config.js'), `exports.url = 'http://127.0.0.1:${port}'\n`)

        console.log(`Koa application is up and running on port ${port}`)
    })
    .catch(err => {
        console.log(`数据库连接失败`, err)
    })
