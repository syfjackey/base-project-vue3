# base-project-vue3

基于Vue3+Pinia+Axios+elementPlus构建的基础管理项目

## 项目特点

- 利用自动导入插件,自动导入相关组件和方法
- 内置部分公共组件
- 支持class或组件方式使用Icon并自动导入icon
- 支持统一认证

## 常用脚本

```sh
npm install       //安装
npm run dev       //启动
npm run build     //打包
```
## 工程说明

### 主要目录说明
- plugins 插件目录
- public
  - config 全局配置
- src
    - api 接口目录
    - assets 静态目录
        - css 
        - images
        - svg  
    - autoImport 自动导入目录
      - components
      - composables
      - directives
      - utils
    - axios 接口请求函数
    - components 全局组件
    - dict 字典目录
    - directives 自定义指令
    - router 路由配置
    - stores 全局存储
    - utils 工具函数
    - views 页面目录
- types Ts类型定义目录

### 重要文件/目录说明
| 目录                          | 说明                                 |
| :---------------------------- | :----------------------------------- |
| /pubilc/config/dev.config.js  | 开发模式全局配置                     |
| /pubilc/config/dev.config.js  | 生成模式全局配置                     |
| /types/global.d.ts            | 全局配置类型定义                     |
| /src/api/common.ts            | 通用接口:远端字典接口                |
| /src/api/login.ts             | 登录获取token                        |
| /src/api/oauth.ts             | 统一认证相关接口                     |
| /src/api/user.ts              | 根据token获取信息/权限/菜单          |
| /src/stores/useLoginStore.ts  | 存储用户信息/权限/菜单               |
| /src/assets/css/variable.scss | 全局注入的scss变量和函数             |
| /src/assets/svg               | svg 图标,会自动注册到unocss-icon插件 |
| /src/autoImport/components    | 自动导入的组件库                     |
| /src/autoImport/composables   | 自动导入的组合函数库                 |
| /src/autoImport/directives    | 自动导入的自定义指令库               |
| /src/autoImport/utils         | 自动导入的工具函数库                 |
| /src/dict/index.ts            | 默认字典库                           |
| /src/router/permission.ts     | 路由权限验证                         |
| /src/utils/eventBus.ts        | 全局通信                             |
| /src/views/oauth              | 统一认证中间页                       |
| /types/auto-imports.d.ts      | 自动导入函数相关类型                 |
| /types/base-type.d.ts         | 基础类型                             |
| /types/components.d.ts        | 自动导入组件相关类型                 |
| /types/system.d.ts            | 系统内置相关类型                     |
| stats.html                    | 性能分析文件                         |
| env.d.ts                      | 全局环境变量类型定义                 |


### 别名支持  
可通过修改 ***vite.config.ts*** 和 ***tsconfig.app.json*** 进行增减

| 别名     | 对应目录          |
| :------- | :---------------- |
| @        | src               |
| @/images | src/assets/images |

### 自动导入说明

- 支持`vue / vueRouter /elementplus` 依赖自动导入.文件中无需import 即可直接使用
- 支持`src/autoImport/components`下组件自动导入,组件名为对应目录+文件名,当文件名为***index***时可省略文件名,例如 /YBar/index.vue 使用方式为 `<YBar />` 
- 支持自定义指令(`src/autoImport/directives`)自动导入,以文件名进行注册使用
- 支持公共代码库(`src/autoImport/composables`)自动导入

#### 字典配置
1. `/src/dict/index.ts` 配置内置字典
2. `/src/api/common.ts` 配置远端字典以及映射关系

#### 字典类型 
```ts
type 字典类型 = DictItem 
type 字典值类型 = DictValue 
type 远端字典类型 = RemoteDictItem
```

#### 字典组件 YDictLabel
```vue
<YDictLabel :type='字典类型' :value="字典值" :defaultLabel="默认值" />
```
#### 字典函数 useDict
> 具体见文件 `/src/autoImport/composables/useDict.ts`
```ts
const { initDict,  getDict,  getDictLabel,  getLocalDict,  getLocalDictLabel,  getRefDict,} =useDict()
initDict(['dictType'],true) // 初始化字典项并缓存
getDict('dictType') // 异步获取字典项
getDictLabel('dictType','value') // 异步获取字典名
getLocalDict('dictType') // 获取本地字典
getLocalDictLabel('dictType','value') // 获取本地字典名
const dict = getRefDict('dictType') // 获取ref类型的字典项
```
#### 表单组合函数 useForm
> 具体见文件 `/src/autoImport/composables/useForm.ts`
```ts
const {formRef,validateForm} =useForm()
// formRef 绑定至 el-form上
const submit = async ()=>{
  await validateForm(()=>console.log('验证失败'))
  // do something
}
``` 
#### 数据组合函数 useData
#### 异步数据组合函数 useAsyncData

#### 弹窗组合函数 useDialog
> 具体见文件 `/src/autoImport/composables/useDialog.ts`
```ts
const {visible,openDialog,dialogData} =useDialog()
// 例
const clickItem =(data:any)=>openDialog(data)
<div @click=clickItem({})></div>
<YDialog v-model="visible" :data="dialogData" />
``` 
#### 权限验证函数 useAuth
> 具体见文件 `/src/autoImport/composables/useAuth.ts`
```ts
const {hasAuth} = useAuth()
// 是否具备 page-export 权限
const result = hasAuth('page-export')
```
#### 右键菜单组件 YContextmenu
> 具体见文件 `/demo/component/YContextmenu`

#### 基础公共函数 basicTools 
> 具体见文件 `/src/autoImport/utils/index.ts`
```ts
/* 获取图片地址 */
basicTools.getImg()
/* 按组分割数组 */
basicTools.splitArr()
/* 是否是url链接 */
basicTools.isUrl()
/* 判断是否是数字 */
basicTools.isNum()
/* 判断字符串数组是否存在交集 */
basicTools.hasIntersection()
/* 获取数据类型 */
basicTools.getType()
/* 判断是否为空 */
basicTools.isEmpty()
/* 下载文件 */
basicTools.downloadFile()
/* 获取本地url地址 */
basicTools.getLocalUrl()
/* 对象转Params */
basicTools.toParams()
/* 数组转树 */
basicTools.toTree()
/* 获取url上传参 */
basicTools.getQuery()
/* 深拷贝 */
basicTools.cloneDeep()
/* 根据某个值过滤树型数组 */
basicTools.filterTreeBy()
/* 获取某个树型数组上键的值集合 */
basicTools.getTreeValueBy()
```


### 访问权限
1. 登录后获取相关权限并存储到useLoginStore当中
2. 通过自定义指令 v-auth 来绑定按钮级权限
3. 通过route.meta中auth 方式来绑定页面浏览权限

### 接口请求函数 *axios/index.ts*
1. 支持取消重复请求,如某接口需关闭此请求,则配置中传入`cancelDebounce`
2. 对外暴露 `clear`与`request`函数
3. 内置一些常见提示 `/src/axios/handleMessage.ts`
```ts
// 使用示例
import { request } from '@/axios'

function doSome(){
  return request({url},{
      /* 是否显示成功信息 */
      showSuccessMessage: false,
      /* 默认成功信息 */
      successMessage: '',
      /* 默认错误信息 */
      errorMessage: '',
      /* 取消防抖 */
      cancelDebounce: false
  })
}
```

### 全局通信

```ts
/* 建议定义类型 */
import eventBus from '@/utils/eventBus'
/* 监听事件 */
eventBus.on(type,()=>{})
/* 触发事件 */
eventBus.emit(type)
```

### 图标使用

#### 通过组件方式使用
1. 通过https://icon-sets.iconify.design/ 查找想使用的图标
2. 例如 elementPlus中用户图标 ep:avatar
3. 通过此`<icon-ep:avatar/>`方式使用
#### 通过类方式使用
1. 同样找出图标名称
2. 通过 `<i class='i-ep:avatar'/>` 方式使用
3. 你也可以使用YIcon组件使用  <YIcon icon='i-ep:avatar' />

#### 使用svg图标
1. 将svg图标放置用/src/assets/svg目录中
2. 重启服务,自动注册svg
3. 通过`<i class='i-custom:svg名称'/>` 方式使用

### VSCode插件推荐

| 名称                            | 说明                        |
| :------------------------------ | :-------------------------- |
| CSS Variable Autocomplete       | Css全局变量提示             |
| DotENV                          | 支持.env样式                |
| Error Lens                      | 错误提示直接显示在文本后方  |
| Live Server                     | 简易Http服务器              |
| Markdown All in One             | Markdown格式支持            |
| Markdown Preview  Enhanced      | Markdown文件预览            |
| npm Intellisense                | 依赖补全                    |
| Paste JSON as Code              | 类型转换,一般用于生成类或ts |
| Path Intellisense               | 路径提示                    |
| Prettier                        | 代码格式化                  |
| Project Manager                 | 项目管理                    |
| SCSS IntelliSense               | SCSS 相关提示               |
| Template String Converter       | 普通字符串转模板字符串      |
| TypeScript Vue Plugin (Volar)   | Vue TS支持                  |
| Vue Language Features (Volar)   | Vue提示                     |
| Vue VSCode Snippets             | Vue代码片段                 |
| git-commit-plugin               | Git提交规范插件             |
| UnoCss                          | UooCss插件                  |
| Doxygen Documentation Generator | 文档注释插件                |

### 常见问题

>**问**: 在ts文件中,使用i-xxx方式 不显示
>**答**: unocss 默认不扫描ts文件所以不显示,如需显示请增加  `// @unocss-include `

>**问**:新增了个svg图标,通过i-custom:xxx方式调用无法显示
>**答**:svg自动导入不是热更新,需要重新启动服务
