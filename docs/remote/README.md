---
sidebar: auto
---
# Genesis-remote
This is a basic remote component. When you use `renderer.renderJson(options)` to output json, you expect it to be used on other services. If you want to know more about how it works, [click here to view the source code](https://github.com/fmfe/genesis/blob/master/packages/genesis-remote/src/index.ts)

## Installation
```bash
npm install @fmfe/genesis-remote
```
### Global registration
```ts
import Vue from 'vue';
import RemoteView from '@fmfe/genesis-remote';

Vue.use(RemoteView);
```
The program will register a `remote-view` component globally
### Partial registration
```ts
import Vue from 'vue';
import { RemoteView } from '@fmfe/genesis-remote';

Vue.extend({
    components: {
        RemoteView
    }
});
```
Generally speaking, the frequency of using remote components is not particularly high, it is recommended to register the components locally

## Callback
### fetch
Description: Both the `server` and `client` will be executed
```vue
<template>
    <remote-view :fetch="fetch" />
</template>
```
### clientFetch
Description: executed on the `client`, the priority is higher than fetch


```vue
<template>
    <remote-view :clientFetch="clientFetch" />
</template>
```
### serverFetch
Note: Execution on the `server side` has a higher priority than fetch, and can only be used on services developed based on `Genesis`.
```vue
<template>
    <remote-view :serverFetch="serverFetch" />
</template>
```
Special note: because the remote component is loaded on the server side and the data of the remote service needs to be stored, the corresponding context needs to be passed to the `Vue` instance
```ts
// entry-client.ts
import { ClientOptions } from '@fmfe/genesis-core';
import Vue from 'vue';

export default async (clientOptions: ClientOptions): Promise<Vue> => {
    return new Vue({
        clientOptions
    });
};
// entry-server.ts
import { RenderContext } from '@fmfe/genesis-core';
import Vue from 'vue';

export default async (renderContext: RenderContext): Promise<Vue> => {
    return new Vue({
        renderContext
    });
};

```
## Data structure
When executing the `fetch`, `clientFetch`, `serverFetch` hooks, you need to return the result of `renderer.renderJson(options)` execution. So the basic data structure should look like this


```ts
export interface RemoteViewData {
    automount: boolean;
    html: string;
    id: string;
    name: string;
    style: string;
    script: string;
    url: string;
    state: { [x: string]: any };
}
```
## Complete example
```vue
<template>
    <remote-view :fetch="fetch" />
</template>
<script>
export default {
    methods: {
        fetch () {
            // Components that call other services
            const res = await axios.get('/api/ssr-service-name/render?url=/demo');
            if (res.status === 200) {
                return res.data;
            }
            return null
        }
    }
}
</script>

```

## Event communication
You can listen to events emitted by the root component of the remote component like a normal component
```vue
<template>
    <remote-view :fetch="fetch" @my-event="myEvent" />
</template>
<script>
export default {
    methods: {
        myEvent(str) {
            console.log(str); // Hello world
        }
    }
}
</script>
```

Remote component fires event

```ts
this.$root.$emit('my-event', 'Hello world');
```