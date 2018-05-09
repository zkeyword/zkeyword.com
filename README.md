## 执行步骤

1、 npm i

2、编辑 ormconfig.json 文件，写入mysql配置

3、npm run start 

4、tsc


## 依赖

npm i -g typeorm


## 目录结构

    / 根目录
    |__ pages next 开发目录
    |__ src 后端开发目录
    |   |__ controller 控制器
    |   |__ entity 实体
    |   |__ services 业务层
    |   |__ index.ts 应用入口文件
    |   |__ routers.ts 理由
    |__ styles stylus开发目录
    |__ next.config.js next 样式配置脚本
    |__ nodemonConfig.json nodemon 配置文件
    |__ ormconfig.json typeorm 配置文件
    |__ package.json npm依赖管理
    |__ tsconfig.json typescript 配置文件
    |__ tslint.json tslint 配置文件