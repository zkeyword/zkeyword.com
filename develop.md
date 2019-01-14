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

## commit 提交规范
* $git cz

* 用于说明 commit 的类别，只允许使用下面7个标识。

  - feat：新功能（feature）

  - fix：修补bug

  - docs：文档（documentation）

  - style： 格式（不影响代码运行的变动）

  - refactor：重构（即不是新增功能，也不是修改bug的代码变动）

  - test：增加测试

  - chore：构建过程或辅助工具的变动