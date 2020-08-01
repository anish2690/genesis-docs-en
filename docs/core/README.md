---
sidebar: auto
---
# genesis-core
Provides the functions required for the production environment to run, so it always guarantees that the dependence is minimal in the production environment. In the development environment, it needs to be used with [@fmfe/genesis-compiler](../compiler)

## Installation
```bash
npm install @fmfe/genesis-core
```

## SSR Options
```ts
import { SSR } from '@fmfe/genesis-core';
const ssr = new SSR({
    // Options
});
```
### name
  - Description: Application name, if your page has multiple `ssr` instances, you need to distinguish it with different nouns.
  - Type: `string`
  - Default value: `ssr-genesis`
  - Examples:
```ts
const ssr = new SSR({
    name: 'ssr-demo'
});
```
### isProd
  - Description: Set the operating mode of the program
  - Type: `boolean`
  - Default value: `process.env.NODE_ENV ==='production'`
  - Examples:
```ts
const ssr = new SSR({
    isProd: process.env.NODE_ENV === 'production'
});
```
### cdnPublicPath
  - Description: All static resources, if you want to add CDN address, just add it here, only effective in production environment
  - Type: `string`
  - Default value: ``
  - Example:
```ts
const ssr = new SSR({
    cdnPublicPath: '//cdn.xxx.com'
});
```

 
### build.baseDir
  - Description: The root directory of the application: on this basis, get the corresponding `src` and `dist` directories
  - Type: `string`
  - Default value: `path.resolve()`
  - Example:
```ts
const ssr = new SSR({
    build: {
        baseDir: path.resolve(__dirname, './')
    }
});
```
### build.outputDir
  - Note: The application's compilation directory, you can use the path relative to the project, you can also use the absolute path
  - Type: `string` path
  - Default value: `application-root-directory/dist/`
  - Example:
```ts
const ssr = new SSR({
    build: {
        outputDir: path.resolve(__dirname, './dist')
    }
});
```
### build.transpile
  - Note: By default, `webpack loader` will ignore the packaging of the `node_modules` directory, and configure your package by configuring `build.transpile`, which is particularly useful when developing plugins
  - Type: `string`
  - Default value: `[]`
  - Example:
```ts
const ssr = new SSR({
    build: {
        transpile: [/src/]  // transpile: [/view-design/],
    }
});
```

### build.alias
  - Description: Alias ​​settings for webpack
  - Types of: `{[x: string]: string}`
  - Defaults: `{}`
```ts
const ssr = new SSR({
    build: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
});
```
### build.browsers
  - Description: According to the version you need to compatible, to produce js and css compatible code, see details [https://github.com/browserslist/browserslist](https://github.com/browserslist/browserslist)
  - Types of: `{
        client?: string | string[];
        server?: string | string[];
    }`
  - Defaults:
```ts
{
    client: ['ie >= 9', 'ios >= 5', 'android >= 4.0'],
    server: [`node >= ${process.versions.node}`]
}
```
Example:
```ts
import process from 'process';

const ssr = new SSR({
    build: {
        browsers: {
            client: ['ie >= 9', 'ios >= 5', 'android >= 4.0'],
            server: [`node >= ${process.versions.node}`]
        }
    }
});
```
### build.template
  - Description: The address of the template rendered by SSR and CSR, it uses the [ejs](https://github.com/mde/ejs) template engine, if you configure the template address, it will use your template address, otherwise it will Use default template
  - Type: `string`
  - Defaults:`path.resolve(this.srcDir, 'index.html')`
  - Default template:
```html
<!DOCTYPE html>
<html>

<head>
    <title>Vue SSR for Genesis</title><%-style%>
</head>

<body>
<%-html%>
<%-scriptState%>
<%-script%>
</body>

</html>
```
Example:
```ts
import path from 'path';

const ssr = new SSR({
    build: {
        template: path.resolve(__dirname, './index.html')
    }
});
```
## SSR Attributes
```ts
import { SSR } from '@fmfe/genesis-core';

const ssr = new SSR({
    // ...Optional
});

// ssr.attribute

```
### ssr.Renderer
Description: An SSR renderer, please see [Renderer](./renderer.md) for details  
### ssr.options
Description: Your incoming options
Type: `Genesis.Options`
### ssr.plugin
Note: plug-in system, please see [Plugin](./plugin.md) for details
Type: `Genesis.PluginManage`
### ssr.isProd
Description: Determine whether it is a production environment
Default value: `process.env.NODE_ENV ==='production'`
Type: `string`
### ssr.name
Description: the name of the application, [options.name](#name) can modify this value
Type: `string`
### ssr.publicPath
Note: The basic path of applying static resources will affect the related configuration of webpack. [options.name](#name) can modify this value
Type: `string`
```ts
const ssr = new SSR({
    build: {
         publicPath: 'https://storage.googleapis.com/bucket-name/'
    }
});
```
### ssr.baseDir
Note: the basic directory of the application, [options.baseDir](#build-basedir) can modify this value    
Default value: `path.resolve()`
Type: `string`
### ssr.outputDir
Description: The application's compilation output directory, [options.build.outputDir](#build-outputdir) can modify this value     
Default value: `compile-output-directory/application-name/` 
Type: `string`
### ssr.srcDir
Description: source code directory 
Default value: `application-root-directory/src/`
Type: `string`
### ssr.srcIncludes
Note: the includes of webpack loader will read the configuration, [options.build.transpile](#build-transpile) can add the files or directories you need to pack    
Type: `string`
### ssr.transpile
Description: Configuration of `options.transpile`
Type: `string`
### ssr.entryClientFile
Description: The entry file of the client 
Default value: `application-root-directory/src/entry-server` 
Type: `string`
### ssr.entryServerFile
Description: The entry file of the server
Default value: `application root directory/src/entry-server`
Type: `string`
### ssr.outputClientManifestFile
Description: The output path of the client's mapping file  
Default value: `compile-output-directory/application-name/server/vue-ssr-client-manifest.json`
Type: `string`
### ssr.outputServerBundleFile
Description: The output path of the mapping file on the server 
Default value: `compile-output-directory/application-name/server/vue-ssr-server-bundle.json` 
Type: `string`
### ssr.templateFile
Note: The module entry address [options.build.template](#build-template) of ssr and csr can modify this value    
Type: `string`   
Default value: `application-root-directory/src/index.html`

### ssr.outputTemplateFile
Description: The output address of the template file   
Type: `string`   
Default value: `compile-output-directory/application-name/server/index.html`



## SSR method
### ssr.getBrowsers
Description: Get the configuration of browsers
Signature:
```ts
ssr.getBrowsers(env: keyof Genesis.Browsers): Genesis.Browserslist;
```
Example:
```ts
ssr.getBrowsers('client');
ssr.getBrowsers('server');
```
### ssr.createRenderer
Description: Create an SSR renderer, generally speaking, you will use it in a production environment  
Signature:
```ts
ssr.createRenderer(options?: Genesis.RendererOptions): Renderer;
```
Example:
```ts
const renderer = ssr.createRenderer();
const app = express();

// Static resource mounting
app.use(
    renderer.staticPublicPath,
    express.static(renderer.staticDir, {
        immutable: true,
        maxAge: '31536000000'
    })
);
// SSR Rendering middleware
app.use(renderer.renderMiddleware());

```
## Renderer properties
### renderer.ssr
Description: Current SSR instance
### renderer.staticPublicPath
Note: The basic path of the static resource file is equivalent to `ssr.publicPath`, which will be used in the production environment
### renderer.staticDir
Note: The directory address where the static resource file is located is equivalent to `ssr.staticDir`, which will be used in the production environment
### renderer.clientManifest
Note: the file list of the client, if you need to do PWA, you can get all the resource list of the client and preload
```ts
export interface ClientManifest {
    publicPath: string;
    all: string[];
    initial: string[];
    async: string[];
    modules: { [key: string]: number[] };
}
```

## Renderer method
### renderer.hotUpdate
Note: The hot update interface is generally only used as a hot update of the development environment
Signature:
```ts
renderer.hotUpdate(options?: Genesis.RendererOptions): void;
```
### renderer.render
Note: The bottom-level rendering method, behind `renderer.renderJson`, `renderer.renderHtml`, and `renderer.renderMiddleware` are based on it for secondary packaging.   
Signature:
```ts
export interface RenderOptions<
    T extends Genesis.RenderMode = Genesis.RenderMode
> {
    req?: IncomingMessage;
    res?: ServerResponse;
    mode?: T;
    url?: string;
    id?: string;
    name?: string;
    automount?: boolean;
    state?: {
        [x: string]: any;
    };
}
render<T extends Genesis.RenderMode = Genesis.RenderMode>(
    options?: Genesis.RenderOptions<T>
): Promise<Genesis.RenderResul>;
```
#### req
  - Description: the object of the current request body
  - Type: `IncomingMessage`
  - Default value: `undefined`
#### res
  - Description: the object of the current response body
  - Type: `ServerResponse`
  - Default value: `undefined`
#### mode
  - Description: What rendering mode to use
  - Type: `string`
  - Default value: `ssr-html`
  - Optional values: `"csr-json" | "ssr-json" | "csr-html" | "ssr-html"`
#### url
  - Note: the current rendering address, you need to use it with `vue-router`
  - Type: `string`
  - Default value: `/`
#### id
  - Note: The currently rendered id is generated by `md5(name + url)` by default
  - Type: `string`
  - Default value: `md5(name + url)`
#### name
  - Note: The name of the current application, if you need to do micro frontend, micro service, you need to define a different name
  - Type: `string`
  - Default value: `ssr-genesis`
#### automount
  - Note: After the js is loaded, whether to automatically install the application. When loading remotely, you may not need to install automatically, you can set it to `false`
  - Type: `boolean`
  - Default value: `true`
#### state
  - Note: The state of the application. If you need to prefetch data on the server, you can store it here, or use it with vuex.
  - Type: `object`
  - Default value: `{}`

### renderer.renderJson
Description: Render a json, you can use this API to develop the interface required by the micro front-end application 
Signature:
```ts
renderJson(
    options?: Genesis.RenderOptions<Genesis.RenderModeJson>
): Promise<Genesis.RenderResultJson>;
```
### renderer.renderHtml
Description: Render an html
Signature:
```ts
renderHtml(
    options?: Genesis.RenderOptions<Genesis.RenderModeHtml>
): Promise<Genesis.RenderResultHtml>;
```

### renderer.renderMiddleware
Note: As long as the middleware for rendering is similar to the middleware design of `express`, it can be used directly. You can adjust the rendering to json or html by [Plugin](./plugin)  
Signature:
```ts
renderMiddleware(
    req: IncomingMessage,
    res: ServerResponse,
    next: (err: any) => void
): Promise<void>;
```
## Renderer Example
### Generate HTML
Description: The following gives an example of generating static html
```ts
import { IncomingMessage, ServerResponse } from 'http';
import { Socket } from 'net';
import { SSR } from '@fmfe/genesis-core';

const ssr = new SSR();
const renderer = ssr.createRenderer();

const render = (url: string) => {
    const req = new IncomingMessage(new Socket());
    const res = new ServerResponse(req);
    req.url = url;
    return renderer.renderHtml({ req, res, mode: 'ssr-html' });
};

render('/home').then((res) => {
    console.log(res.data); // Render into html, you can save it and generate a static website
});

```
## Plugin
### Hook description
```ts
import { SSR, Plugin } from '@fmfe/genesis-core';

class MyPlugin extends Plugin {

    /**
     * Execute before compilation
     */
    public beforeCompiler(type: Genesis.CompilerType) {}
    /**
     * Modify the webpack configuration
     */
    public chainWebpack(config: Genesis.WebpackHookParams) {}
    /**
     * Modify babel's configuration
     */
    public babel(config: Genesis.BabelConfig) {}
    /**
     * Modify postcss-loader configuration
     */
    public postcss(config: PostcssOptions) {}
    /**
     * Execute after compilation
     */
    public afterCompiler(type: Genesis.CompilerType) {}
    /**
     * Execute before rendering
     */
    public renderBefore(renderContext: Genesis.RenderContext) {}
    /**
     * Execute after rendering
     */
    public renderCompleted(renderContext: Genesis.RenderContext) {}
}

const ssr = new SSR();
ssr.plugin.use(new MyPlugin(ssr));

```

### Externalization dependency
Note: If you are developing a large-scale application, you need to provide remote component loading, to avoid repeated loading of the same content between projects, then external dependencies are essential
```ts
class MyPlugin extends Plugin {
    /**
     * Modify the webpack configuration
     */
    public chainWebpack({ config, target }: Genesis.WebpackHookParams) {
        if (target === 'client') {
            config.externals({
                vue: 'Vue',
                'vue-router': 'VueRouter',
                axios: 'axios'
            });
        }
    }

    /**
     * Execute before rendering
     */
    public renderBefore(renderContext: Genesis.RenderContext) {
        renderContext.data.script +=
            '<script src="https://cdn.jsdelivr.net/npm/vue@' + require('vue').version + '" defer></script>' +
            '<script src="https://cdn.jsdelivr.net/npm/vue-router@' + require('vue-router').version + '" defer></script>' +
            '<script src="https://cdn.jsdelivr.net/npm/axios@' + require('axios').version + '" defer></script>';
    }
}

```