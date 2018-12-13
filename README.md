使用 Koa、TypeORM、TypeScript、React SSR 构建重构自己的博客（由于本项目是从wordpress迁移过来的，所以数据部分采用wordpress数据）

## SSR 流程及思路

node 在到请求后利用了 react 提供的 renderToString 函数将 jsx 解析成 html 字符串返回给浏览器，在 react 16 版本提供了 ReactDOM.hydrate 替换 ReactDOM.render，服务端渲染情况下，进行hydrate，绑定事件到已存在的dom节点，免去了创建dom节点的工作，但仍然需要完成dom diff，和 dom patch 的工作。等服务端创建完dom节点后，其它工作将交给客户端去做，当用户点击页面时则是调用了已经缓存到客户端的 js 文件重新渲染页面。

对比以下单纯客户端渲染后服务端渲染的步骤，将很容易明白两者的区别：

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

本例使用 typescript，将 react 和 node 两端的代码编译成 es5，node 可以直接执行，而客户端则是直接用 webpack 将 ts 文件打包 es5，实现了一份代码编译成两份分开执行。

## 准备

1、npm i

2、编辑 ormconfig.json 文件，写入mysql配置

3、npm run dll 构建 DLL 库(如果公用库没改变不需要重复构建)

## 开发

1、npm run dev 启动服务


## 部署

1、npm run build:prod 编译客户端

2、npm run start / pm2 start ecosystem.json 启动服务端


## 依赖

    npm i -g typeorm
    
    npm i -g typescript


## 目录结构

    / 根目录
    |__ build webpack 配置目录
    |   |_ init.js 初始化网址、关键词、title等配置
    |__ dist ts编译后服务端目录
    |__ public 静态目录、webpack编后译客户端目录
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
    |__ views 模板
    |__ ecosystem.json pm2 配置文件
    |__ nodemonConfig.json nodemon 配置文件
    |__ ormconfig.json typeorm 配置文件
    |__ package.json npm依赖管理
    |__ postcss.config.js postcss配置文件
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
- 引入pwa
- 引入jest，并使用