import * as stylus from 'stylus'

module.exports = options => {
    const middleware = stylus.middleware(options)

    const compile = (req, res) => new Promise((resolve, reject) => {
        middleware(req, res, err => err ? reject(err) : resolve())
    })

    return async function (ctx, next) {
        await compile(ctx.req, ctx.res)
        await next()
    }
}
