# spx-gui

## 依赖安装
`npm install`

相关依赖如下
```node
"axios": "^1.6.5",  
"vue": "^3.3.11",  
"vue-router": "^4.2.5",  
"vuex": "^4.0.2"
```

## 项目运行
`vite`

## 代码架构
```
├── public 
└── src 
    ├── api          请求
    ├── assets       资源文件
    ├── components   组件
    ├── router       路由
    ├── store        状态/存储管理
    └── util         工具
```


## 开发规范

### 目录命名方式
1. 以小写，中划线分割，例：`spirte-library`

### 组件开发规范
1. 驼峰式命名
2. 标签的顺序统一为`<template>、<script>、<style>`
3. 采用组件式API编写代码
4. `defineProps`采用类型声明
5. 与父组件紧密耦合的子组件，命名要以父组件名为前缀，例：`SpirteList`、`SpirteListItem`、`SpirteListItemButton`

一个完整的组件编写例子如下，命名为`SpirteList`：
```vue
<template>
  <div>展示SpirteList</div>
</template>

<script setup>
// ----------导入需求包 / 组件组件----------------------------
import {computed, onMounted} from "vue";
// import aaa;

// ----------props & emit-------------------------
const props = defineProps({ spirteName: String });// 基于类型声明的props
const emit = defineEmits(['update']);

// ----------data相关（reactive，ref..）-----------
const count = ref(0); 

// ----------计算属性------------------------------
const doubled = computed(() => count.value * 2);

// ----------生命周期钩子---------------------------
onMounted(() => { console.log('Component is mounted!'); });

// ----------其他组合式函数-------------------------
// 比如useRouter, useStore..

// ----------方法，相关的方法尽量放在上下文------------

</script>
```

组件调用举例
-  `<!--  S Component ComponentName -->`  表示组件开始
- `<!--  E Component ComponentName -->`  表示组件结束
```vue
<template>  
  <!--  S Component SpirteList -->  
  <SpriteList></SpriteList>  
  <!--  E Component SpirteList -->  
</template>  
  
<script setup>  
import SpriteList from "@/components/spirte-list/SpriteList.vue";  
</script>
```

### 路由添加
以添加SpirteList为例
1. 原内容
```javascript
const routes = [
    {path: '/', redirect: '/spx/homepage' },
    {        
        path: '/spx/homepage',  
        name: 'SpxHomepage',  
        component: () =>  
            import("../components/SpxHomepage.vue"),  
    }
];
```

2. 添加SpirteList
```javascript
const routes = [  
    { path: '/', redirect: '/spx/homepage' },
    {       
        path: '/spx/homepage',  
        name: 'SpxHomepage',  
        component: () =>  
            import("../components/SpxHomepage.vue"),  
    },  
    {  
        path: '/spirte/list',  
        name: 'SpirteList',  
        component: () =>  
            import("../components/spirte-list/SpriteList.vue"),  
    },  
];
```

3. 在浏览器地址栏输入 [项目部署url]/spirte/list即可访问到该组件页面


### 工具类开发规范
以封装一个简单的ajax请求为例
1. 创建相应包及js文件，比如在api包下创建request.js
2. 编写工具函数，写好完整注释

```javascript
/**  
 * @description 基础的ajax请求方法  
 *  
 * @param method 请求方法，"POST" / "GET"  
 * @param url   请求地址  
 * @param dataOrParams  请求参数/请求体  
 * @param headers   请求头  
 * @returns {Promise<any>}  
 *  
 * @author yxy  
 * @createDate 2024.1.10  
 */
export async function request(method, url, dataOrParams = null,headers={} ) {  
    const base_url = "http://localhost:xxxx" + url;  
    try {  
        const defaultHeaders = {  
            "Content-Type": "application/json",  
        };  
  
        const mergedHeaders = {  
            ...defaultHeaders,  
            ...headers,  
        };  
  
        const response = await axios({  
            method,  
            url: base_url,  
            data: method.toLowerCase() === "get" ? null : dataOrParams,  
            params: method.toLowerCase() === "get" ? dataOrParams : null,  
            headers: mergedHeaders,  
        });  
        console.log(`[request] ${base_url} |接口请求成功，response:`);  
        console.log(response)  
        return response.data;  
    } catch (error) {  
        console.log(`[request] ${base_url} |接口请求失败, 请求体:dataOrParams: ${JSON.stringify(dataOrParams)}`);  
        console.log(error);  
        throw error;  
    }  
}
```

### 团队交接规范
以TODO的方式进行团队代码交接
```javascript
<script setup>

// TODO 完成xx内容编写/bugfix  @xxx
    
</script>
```


## 完整的组件编写流程参考
以编写**音频编辑页面**为例：
1. 如果是新页面，创建一个文件夹：`sounds-edit`
2. 创建`SoundEdit.vue`组件
3. 注册该组件到路由
4. 完成页面编写
