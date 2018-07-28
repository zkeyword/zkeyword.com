import { Context } from 'koa'
import * as path from 'path'
import { ext, domain } from '../utils/config'

export function whiteList() {
    return async (ctx: Context, next: () => Promise<any>) => {
        const urlExt = path.extname(ctx.originalUrl)
        const hostname = ctx.hostname
        const filter = () => {
            for (let i = 0; i < ext.length; i++) {
                if (urlExt === ext[i]) {
                    return true
                }
            }
            return false
        }
        const isTrustSite = () => {
            for (let i = 0; i < domain.length; i++) {
                if (hostname === domain[i]) {
                    return true
                }
            }
            return false
        }

        if (filter() && !isTrustSite()) {
            ctx.body = ''
            return
        }

        await next()
    }
}
