import { Controller, Ctx, Get, Post, UploadedFile } from 'routing-controllers'
import { minify } from 'html-minifier'
import * as LRU from 'lru-cache'
import { FILE_UPLOAD_OPTIONS } from '../utils/upload'
import { readDir } from '../utils/fs'
import { render } from '../utils/render'

const cache = LRU({
    max: 5000,
    maxAge: 365 * 24 * 1000 * 60 * 60
})

@Controller('/admin')
export class UserController {

    @Post('/upload')
    async upload(@UploadedFile('file', { options: FILE_UPLOAD_OPTIONS }) file: any, @Ctx() ctx: any) {
        if (file) {
            const filename = `${ctx.origin}/upload/${file.filename}`
            cache.set('filename', filename)
            return {
                filename,
                msg: '上传成功'
            }
        } else {
            return {
                msg: '上传成功'
            }
        }
    }

    @Get('/login')
    async login(@Ctx() ctx: any) {
        const ServerData = {}
        const t = await ctx.render('admin', {
            title: 'admin',
            html: minify(render(ServerData, ctx.req.url, 'admin')),
            ServerData
            // data: await postGetListService()
        })
        return ctx
    }

}