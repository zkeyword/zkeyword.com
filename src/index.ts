import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { createKoaServer } from 'routing-controllers'
import * as Router from 'koa-router'
import * as bodyParser from 'koa-bodyparser'
import { join } from 'path'
import * as next from 'next'
import * as logger from 'koa-logger'
import * as json from 'koa-json'
import * as views from 'koa-views'
import * as fs from 'fs'

const port = parseInt(process.env.PORT, 10) || 3001
const dev = process.env.NODE_ENV !== 'production'
global.app = next({ dev })
global.handle = global.app.getRequestHandler()


createConnection()
    .then(async () => {
        await global.app.prepare()

        const server = createKoaServer({
            controllers: [__dirname + '/controllers/*{.js,.ts}']
        })

        server.use(views(join(__dirname, '../views'), {
            extension: 'ejs'
        }))
        server.use(json())
        server.use(logger())
        server.use(bodyParser())
        server.listen(port)

        fs.writeFileSync(join(__dirname, '../config.js'), `exports.url = 'http://127.0.0.1:${port}'\n`)

        console.log(`Koa application is up and running on port ${port}`)
    })
    .catch(err => {
        console.log(`数据库连接失败`, err)
    })
