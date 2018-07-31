import { Controller, Ctx, Get, Post, Delete, Param, ContentType, QueryParam } from 'routing-controllers'
import Axios from 'axios'
import { postGetListService, postGetByNameService, postGetByTitleService, postByTagNameService, postGetByIDService, postModifyByIDService, postDeleteByIDService } from '../service/wpPostService'
import { getUserByUserNameService } from '../service/userService'
import { crypto } from '../utils/auth'

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

    @Get('/posts/id/:id')
    async getPostbyId(@Ctx() ctx: any, @Param('id') id: number) {
        if (!ctx.session.username) return '权限不够'
        return await postGetByIDService(id)
    }

    @Post('/posts/id/:id')
    async modifyPostbyId(@Ctx() ctx: any, @Param('id') id: number) {
        if (!ctx.session.username) return '权限不够'
        return await postModifyByIDService(id)
    }

    @Delete('/posts/id/:id')
    async deletePostbyId(@Ctx() ctx: any, @Param('id') id: number) {
        if (!ctx.session.username) return '权限不够'
        return await postDeleteByIDService(id)
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
        const { username, password } = ctx.request.body
        const userInfo = await getUserByUserNameService(username)
        if (userInfo && crypto(password) === userInfo.password) {
            ctx.session.username = username
            return {
                code: 200,
                msg: '登录成功'
            }
        }
        return {
            code: 0,
            msg: '登录失败，请检查用户名和密码',
            data: ctx.request.body
        }
    }

    @Get('/logout')
    async getLogout(@Ctx() ctx: any) {
        delete ctx.session.username
        return {
            code: 200,
            msg: '退出成功'
        }
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