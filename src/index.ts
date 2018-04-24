import "reflect-metadata";
import { createConnection } from "typeorm";
import * as Koa from "koa";
import * as Router from "koa-router";
import * as bodyParser from "koa-bodyparser";
import { AppRoutes } from "./routes";

// create connection with database
// note that its not active database connection
// TypeORM creates you connection pull to uses connections from pull on your requests
createConnection()
    .then(async connection => {

        // create koa app
        const app = new Koa();
        const router = new Router();
        const port = 3000

        // register all application routes
        AppRoutes.forEach(route => router[route.method](route.path, route.action));

        // run app
        app.use(bodyParser());
        app.use(router.routes());
        app.use(router.allowedMethods());
        app.listen(port);

        console.log(`Koa application is up and running on port ${port}`);

    })
    .catch(error => console.log("TypeORM connection error: ", error));