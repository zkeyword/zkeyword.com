import * as jwt from 'jsonwebtoken'

export async function pageVerify(ctx, next) {
    const token = ctx.cookies.get('access_token'),
        url = ctx.request.url,
        adminReg = /admin/g,
        loginReg = /admin\/login|admin\/registe/g

    if (adminReg.test(url) && !loginReg.test(url)) {

        if (token === '') {
            ctx.redirect('/admin/login')
        }

        let tokenContent
        try {
            tokenContent = await jwt.verify(token, 'zkeyword')
        } catch (err) {
            ctx.redirect('/admin/login')
        }
    }

    await next()
}

export async function checkToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, 'zkeyword', (err, decoded) => {
            if (err) reject(err)
            resolve(decoded)
        })
    })
}

export async function apiAUTH (ctx, next) {
    try {
        let { authorization } = ctx.header
        if (authorization) {
            try {
                authorization = authorization.split(' ')[1]
                const payload = await checkToken(authorization)
                ctx.user = {
                    ...payload
                }
            } catch (err) {
                console.log('token verify fail: ', err)
            }
        }
        console.log(`token: ${authorization}`)
    } catch (err) {
        // if (err.status === 401) {
        //     ctx.body = {
        //         code: -1,
        //         message: '认证失败'
        //     }
        // } else {
        //     err.status = 404
        //     ctx.body = '404'
        //     console.log('不服就是怼：', err)
        // }
    }
    return next()
}
