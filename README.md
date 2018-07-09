使用 Koa、TypeORM、TypeScript、React SSR 构建重构自己的博客

## SSR 流程及思路

用户从浏览器发起一个请求时，node 利用 React 提供 renderToString 函数将 JSX 的文件解析成 HTML 返回给浏览器并返回 webpack 预先编译好的静态 js 文件，当用户点击页面时则是调用了已经缓存到客户端的 js 文件重新渲染页面, 实现页面无刷。

客户端渲染路线：

    1. 请求一个html 
    2. 服务端返回一个html
    3. 浏览器下载html里面的js/css文件
    4. 等待js文件下载完成
    5. 等待js加载并初始化完成
    6. js代码终于可以运行，由js代码向后端请求数据( ajax/fetch )
    7. 等待后端数据返回
    8. 客户端 react-dom 从无到完整地，把数据渲染为响应页面

服务端渲染路线：

    2. 请求一个html
    2. 服务端请求数据( 内网请求快 )
    3. 服务器初始渲染，服务端性能好，较快
    4. 服务端返回已经有正确内容的页面
    5. 客户端请求js/css文件
    6. 等待js文件下载完成
    7. 等待js加载并初始化完成
    8. 客户端 react-dom 把剩下一部分渲染完成( 内容小，渲染快 )


## 执行步骤

> client 端和 server 端 tsconfig.json 不是同一份

1、 npm i

2、编辑 ormconfig.json 文件，写入mysql配置

3、tsc -w

4、webpack -w

5、npm run start


## 依赖

npm i -g typeorm
npm i -g typescript


## 目录结构

    / 根目录
    |__ pubulic 静态目录
    |__ src 源文件
    |   |__ client 
    |   |  |__ components 组件
    |   |  |__ containers 容器页面
    |   |  |__ services 业务层
    |   |  |__ router 路由
    |   |  |__ index.ts 应用入口文件
    |   |__ server
    |   |  |__ controller 控制器
    |   |  |__ entity 实体
    |   |  |__ services 业务层
    |   |  |__ index.ts 应用入口文件
    |   |  |__ routers.ts 路由
    |   |__ types TypedDefinition 类型文件
    |__ ecosystem.json pm2 配置文件
    |__ nodemonConfig.json nodemon 配置文件
    |__ ormconfig.json typeorm 配置文件
    |__ package.json npm依赖管理
    |__ tsconfig.json typescript 配置文件
    |__ tslint.json tslint 配置文件


## TODO LIST

- ~~完成基本骨架~~
- ~~引入stylus~~
- ~~引入mobx~~
- ~~完善webpack配置~~
- ~~antd 按需加载不成功的bug~~
- 完成页面逻辑
- 引入热更新
- 考虑使用parcel
