import 'reflect-metadata'
import { createConnection } from 'typeorm'
import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as bodyParser from 'koa-bodyparser'
import { AppRoutes } from './routes'
// import * as next from 'next'
import { join } from 'path'

// const dev = process.env.NODE_ENV !== 'production'
// const app = next({ dev, dir: join(__dirname, '../client') })
// console.log(app.prepare())

createConnection()
    .then(async connection => {

        // create koa app
        const app = new Koa()
        const router = new Router()
        const port = 4000

        // register all application routes
        AppRoutes.forEach(route => router[route.method](route.path, route.action))

        // run app
        app.use(bodyParser())
        app.use(router.routes())
        app.use(router.allowedMethods())
        app.listen(port)

        console.log(`Koa application is up and running on port ${port}`)

    })
    .catch(error => console.log('TypeORM connection error: ', error))