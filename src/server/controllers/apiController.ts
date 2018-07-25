import { Controller, Ctx, Get, Param, ContentType, Post, QueryParam } from 'routing-controllers'
import { postGetListService, postGetByNameService, postGetByTitleService, postByTagNameService } from '../service/wpPostService'
import Axios from 'axios'

@Controller('/api')
export class UserController {

    @Get('/posts')
    @ContentType('application/json')
    async getPostFirst(@Ctx() ctx: any) {
        return await postGetListService()
    }

    @Get('/posts/page/:pageIndex')
    async getPost(@Param('pageIndex') pageIndex: number) {
        return await postGetListService(pageIndex)
    }

    @Get('/posts/:name')
    async getPostByName(@Param('name') name: string) {
        return await postGetByNameService(name)
    }

    @Get('/posts/search/:name')
    async getPostByLinkTitle(@Param('name') name: string) {
        return await postGetByTitleService(name)
    }

    @Get('/tag/:name')
    async getPostByTagName(@Param('name') name: string) {
        return await postByTagNameService(name)
    }

    // TODO
    @Post('/pushToBaidu')
    async pushToBaidu(@Ctx() ctx: any) {
        const postData = ctx.request.body
        // let result = {
        //     success: 0,
        //     message: '',
        // }

        await Axios.post(`http://data.zz.baidu.com/urls?site=zkeyword.com&token=Pl9SFDXqRSaw2hBf`)
        // .then(function (res) {
        //     result = res.text
        // })

        // ctx.body = result
        return ctx
    }


    @Post('/login')
    async postLogin(@Ctx() ctx: any) {
        console.log(ctx.request.body)
        return ctx.request.body
    }

    // @Get('/posts/html')
    // // @Render('test') // routing-controllers Render有bug
    // async getHtml(@Ctx() ctx: any) {
    //     await ctx.render('test', {
    //         data: await postGetListService()
    //     })
    //     return ctx
    // }
}