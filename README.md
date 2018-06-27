使用Koa、TypeORM、TypeScript、react ssr构建重构自己的博客

## 执行步骤

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
- 完成页面逻辑
- 引入stylus
- 引入mobx
- 引入热更新
- 考虑使用parcel
- 完善webpack配置