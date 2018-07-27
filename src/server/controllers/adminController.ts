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

    @Get('/')
    async home(@Ctx() ctx: any) {
        if (!ctx.session.username) ctx.redirect('/admin/login')
        const ServerData = {
            isLogin: !!ctx.session.username
        }
        await ctx.render('admin', {
            title: 'admin',
            html: minify(render(ServerData, ctx.req.url, 'admin')),
            ServerData
        })
        return ctx
    }

    @Get('/login')
    async login(@Ctx() ctx: any) {
        const ServerData = {
            isLogin: !!ctx.session.username
        }

        // if (!!ctx.session.username) ctx.redirect('/admin')
        await ctx.render('admin', {
            title: 'admin',
            html: minify(render(ServerData, ctx.req.url, 'admin')),
            ServerData
        })
        return ctx
    }

    @Get('/logout')
    async getLogout(@Ctx() ctx: any) {
        delete ctx.session.username
        ctx.redirect('/admin/login')
        return ctx
    }

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

}