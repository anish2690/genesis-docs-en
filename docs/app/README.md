---
sidebar: auto
---
# genesis-app
It provides a method to quickly create an APP, and wraps `vue-router`, which helps you solve the problem of conflicts between multiple `Router` instances in historical mode

## Installation
```bash
npm install vue-router @fmfe/genesis-app
```

## Use
### Routing configuration
```ts
// import VueRouter from 'vue-router';
import { Router } from '@fmfe/genesis-app';
const router = new Router({
    mode: 'history'
});
```
Just need to modify [VueRouter](https://github.com/vuejs/vue-router) into a router of `@fmfe/genesis-app`, and the other is still the same as [VueRouter](https://github.com/vuejs/vue-router) is used in the same way


### Client use
```ts
// entry-client.ts
import { ClientOptions } from '@fmfe/genesis-core';
import { createClientApp } from '@fmfe/genesis-app';
import Vue from 'vue';
import App from './app.vue';

export default async (clientOptions: ClientOptions): Promise<Vue> => {
    return createClientApp({
        App,
        clientOptions,
        vueOptions: {
            // Options passed to new Vue({}) example router, store etc
            // By default, renderContext is passed to new Vue({ clientOptions })
        }
    });
};

```
### Server
```ts
// entry-server.ts
import { RenderContext } from '@fmfe/genesis-core';
import { createServerApp } from '@fmfe/genesis-app';
import Vue from 'vue';
import App from './app.vue';

export default async (renderContext: RenderContext): Promise<Vue> => {
    return createServerApp({
        App,
        renderContext,
        vueOptions: {
            // options passed to new Vue({})  example router, store etc
            // Recognize that renderContext is passed to new Vue({ renderContext })
        }
    });
};

```