import { Controller, Ctx, Get, Post, UploadedFile } from 'routing-controllers'
import * as LRU from 'lru-cache'
import { FILE_UPLOAD_OPTIONS } from '../middleware/upload'
import { readDir } from '../utils'

const cache = LRU({
    max: 5000,
    maxAge: 365 * 24 * 1000 * 60 * 60
})

@Controller()
export class UserController {

    @Get('/iot-android-showTime-api')
    async home( @Ctx() ctx: any ) {
        await ctx.render('iot-android-showTime-api')
        return ctx
    }

    @Get('/iot-android-showTime-api/photo')
    async photo( @Ctx() ctx: any ) {
        return cache.get('filename') || `${ctx.origin}/img/default.png`
    }

    @Post('/iot-android-showTime-api/upload')
    async upload( @UploadedFile('file', { options: FILE_UPLOAD_OPTIONS }) file: any, @Ctx() ctx: any ) {
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

    @Get('/iot-android-showTime-api/photoList')
    async photoList( @Ctx() ctx: any ) {
        await ctx.render('iot-android-showTime-api-photoList')
        return ctx
    }

    @Get('/iot-android-showTime-api/photoList/all')
    async getPhotoList( @Ctx() ctx: any ) {
        let photoList = await readDir(`${__dirname}/../../public/upload`)
        photoList = photoList.map((item, index) => `${ctx.origin}/upload/${item}`)
        return photoList
    }

}