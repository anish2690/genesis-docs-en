---
sidebar: auto
---
# genesis-compiler
Dependency during development, you will not use it in a production environment, which can effectively reduce the size of production dependencies

## Installation
```bash
npm install @fmfe/genesis-compiler -D
```

## Build properties
### build.ssr
Description: When creating an object, the ssr object passed in
## Build method
### build.start
Description: Start compiling  
signature:
```ts
build.start(): Promise<[boolean, boolean]>;
```
### build.destroy
Description: Cancel compilation and free memory 
Signature:
```ts
build.destroy(): Promise<void>;
```
## Build Example
```ts
import { Build } from '@fmfe/genesis-compiler';
import { SSR } from '@fmfe/genesis-core'

const start = () => {
    const ssr = new SSR();
    const build = new Build(ssr);
    return build.start();
};
export default start();
```
## Watch properties
### build.ssr
Description: When creating an object, the ssr object passed in
### build.devMiddleware
Description: Webpack's [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) middleware
### build.hotMiddleware
Description: Webpack's [webpack-hot-middleware](https://github.com/webpack-contrib/webpack-hot-middleware) middleware
### build.renderer
Description: [renderer](../core/renderer.html) created by [ssr.createRenderer()](../core/ssr.html#ssr-createrenderer) method
## Watch method
### build.start
Note: Start compiling, you must execute this method to read the `renderer` attribute, otherwise the program will report an error  
Signature:
```ts
watch.start(): Promise<void>;
```
### build.destroy
Description: Cancel compilation and free memory  
Signature:
```ts
watch.destroy(): Promise<void>;
```
## Watch comprehensive example
```ts
import express from 'express';
import { SSR } from '@fmfe/genesis-core';
import { Watch } from '@fmfe/genesis-compiler';

const start = async () => {
    const ssr = new SSR();
    const watch = new Watch(ssr);
    const app = express();

    await watch.start();
    // You must wait for watch.start() to complete before you can get a renderer instance
    const renderer = watch.renderer;

    app.get('*', renderer.renderMiddleware);

    return app;
};

start();

```
## Window genesis
On the client, the program will inject a `genesis` object on the `window` object to manage the installation and un-installation of the application
### genesis.register
Description: Register an application. After the js is loaded, the program will automatically register, which is actually the method of exporting the `src/entry-client` file `export default` 
Signature:
```ts
window.genesis.register(
    name: string,
    createApp: (options: Genesis.ClientOptions) => Promise<Vue>
);
```
### genesis.install
Note: installing an application will return an `appId` to you, you can call `uninstall` to force uninstall the application
Signature:
```ts
window.genesis.install(options: Genesis.ClientOptions): number;
```
### genesis.uninstall
Note: Force uninstall the application. Generally speaking, you do not need to call this method. The program will automatically uninstall when the Vue instance is destroyed. 
Signature:
```ts
window.genesis.uninstall(appId: number): Promise<void>;
```