import { Controller, Ctx, Get, Post, UploadedFile } from 'routing-controllers'
import * as LRU from 'lru-cache'
import { FILE_UPLOAD_OPTIONS } from '../utils/upload'
import { readDir } from '../utils/fs'

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

    @Get('/post')
    async getPostFirst(@Ctx() ctx: any) {
        return 1111
    }

}