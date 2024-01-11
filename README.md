# spx-gui

## Dependency Installation
`npm install`

Dependencies are as follows:
```node
"axios": "^1.6.5",  
"vue": "^3.3.11",  
"vue-router": "^4.2.5",  
"vuex": "^4.0.2"
```

## Project Execution
`vite`

## Code Architecture
```arduino
├── public 
└── src 
    ├── api          // Requests
    ├── assets       // Resource files
    ├── components   // Components
    ├── router       // Routing
    ├── store        // State/Storage Management
    └── util         // Utils
```

## Development Standards
### Directory Naming Convention
1. Use lowercase, separated by hyphens, e.g., sprite-library

### Component Development Standards
1. CamelCase naming
2. The order of tags is unified as `<script>, <template>, <style>`
3. Use the Composition API for coding
4. defineProps should use type declaration
5. Child components that are tightly coupled with the parent component should be prefixed with the parent component's name, e.g., SpriteList, SpriteListItem, SpriteListItemButton

Here is a complete example of a component named SpriteList:
```vue
<template>
  <div>Display SpriteList</div>
</template>

<script setup>
// ----------Import required packages / components-----------
import {computed, onMounted} from "vue";
// import aaa;

// ----------props & emit------------------------------------
const props = defineProps({ spriteName: String }); // Props based on type declaration
const emit = defineEmits(['update']);

// ----------data related (reactive, ref..)------------------
const count = ref(0);

// ----------computed properties-----------------------------
const doubled = computed(() => count.value * 2);

// ----------lifecycle hooks---------------------------------
onMounted(() => { console.log('Component is mounted!'); });

// ----------other composition functions---------------------
// Such as useRouter, useStore..

// ----------methods-----------------------------------------
</script>
```

Example of component invocation:
<!-- S Component ComponentName --> indicates the start of the component
<!-- E Component ComponentName --> indicates the end of the component
```vue3
<template>
  <!--  S Component SpriteList -->
<SpriteList></SpriteList>
  <!--  E Component SpriteList -->
</template>

<script setup>
import SpriteList from "@/components/sprite-list/SpriteList.vue";
</script>
```

### Route Addition
Adding SpriteList as an example:

1. Original content
```javascript
const routes = [
    { path: '/', redirect: '/spx/homepage' },
    {
    path: '/spx/homepage',
    name: 'SpxHomepage',
    component: () =>
    import("../components/SpxHomepage.vue"),
    }
];
```

2. Adding SpriteList
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
    path: '/sprite/list',
    name: 'SpriteList',
    component: () =>
    import("../components/sprite-list/SpriteList.vue"),
    },
];
```

3. Enter [project deployment URL]/sprite/list in the browser address bar to access the component page

### Utility Function Standards
Encapsulating a simple ajax request as an example:

1. Create the appropriate package and js file, e.g., create request.js in the api package
2. Write utility functions with complete comments

```javascript
/**
* @description Basic ajax request method
*
* @param method Request method, "POST" / "GET"
* @param url    Request URL
* @param dataOrParams  Request parameters/body
* @param headers   Request headers
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
        console.log(`[request] ${base_url} |request successful，response:`);
        console.log(response)
        return response.data;
    } catch (error) {
        console.log(`[request] ${base_url} |request failed, dataOrParams: ${JSON.stringify(dataOrParams)}`);
        console.log(error);
        throw error;
    }
}

```

### Team Work Standards
Use TODO for team code handover

```javascript
<script setup>

// TODO Complete xx content writing/bugfix  @xxx
    
</script>
```

## Complete Component Development Process Reference
Taking the creation of an Audio Editing Page as an example:

1. If it's a new page, create a folder, sounds-edit
2. Create SoundEdit.vue component
3. Register the component in the route
4. Complete the page development
