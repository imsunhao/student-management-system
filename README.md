## web-steps demo

### 如何开发

#### 准备工作

1. 安装数据库(如果已经安装过一次, 那么需要跳过这一步), 注意替换 \${\_\_dirname} 为 项目路径

   ```bash
   docker build -f ./mongodb/Dockerfile-mongo -t mongo:v0.0.1 .
   docker run -itd --name mongo -p 27017:27017 -v ${__dirname}/mongodb/data/db:/data/db -v ${__dirname}/mongodb/data/log:/var/log/mongodb/ --env-file ./mongodb/mongo.env mongo:v0.0.1
   ```

1. 添加私人配置 添加文件 ./private-configuration/index.ts, 注意替换 `${}`

   ```typescript
   import { UserConfig } from '@web-steps/config'
   import { T_INJECT_CONTEXT } from '../inject-context/type'
   import { STATIC_HOST } from '../config/settings'

   const UPLOAD_SUPORT_EXTS = [
     '.js',
     '.css',
     '.png',
     '.jpg',
     '.gif',
     '.ttf',
     '.ico',
     '.otf',
     '.woff',
     '.woff2',
     '.svg',
     '.eot',
     '.mp4',
     '.html',
     '.json',
     '.wasm',
   ]

   export const cdn: UserConfig<T_INJECT_CONTEXT>['release']['cdn'] = {
     staticHost: STATIC_HOST,
     name: 'aliyun',
     options: {
       region: `${region}`,
       accessKeyId: `${accessKeyId}`,
       accessKeySecret: `${accessKeySecret}`,
       bucket: `${bucket}`,
     },
     suportExts: UPLOAD_SUPORT_EXTS,
   }

   export const dingdingRobotSetting = {
     name: `${name}`,
     hook: `${hook}`,
     secret: `${secret}`,
   }
   ```

#### 启动 dev 服务

1. 启动服务

   ```bash
   yarn dev
   ```

1. 打开 <http://localhost:8060/>

### 如何上线

1. 启动 发布命令

   ```bash
   yarn release
   ```

### TODO

- [x] 自动化 请求路由
- [] 自动化路由
- [] docker 轻量化打包 -> 不使用 docker update 的方式
