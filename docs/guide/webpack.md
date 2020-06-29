# Webpack
If you want to modify the configuration of [webpack](https://webpack.js.org/), only through the form of plugins
To modify, only [webpack-chain](https://github.com/neutrinojs/webpack-chain#readme) is provided to operate the configuration of [webpack](https://webpack.js.org/)

```ts
import { SSR, Plugin } from '@fmfe/genesis-core';

class MyPlugin extends Plugin {
    /**
     * Modify the webpack configuration
     */
    public chainWebpack(config: Genesis.WebpackHookParams) {}
}

const ssr = new SSR();
// Add a plugin
ssr.plugin.use(new MyPlugin(ssr));
```
::: warning note
In a production environment, you do not need to use webpack related plugins, so you only need to use this plugin in the dev environment and build phase.
:::

## The official built-in webpack plugin
- [babel](https://github.com/fmfe/genesis/blob/master/packages/genesis-compiler/src/plugins/babel.ts) Compile code, support TS by default
- [bar](https://github.com/fmfe/genesis/blob/master/packages/genesis-compiler/src/plugins/bar.ts) Progress bar display
- [font](https://github.com/fmfe/genesis/blob/master/packages/genesis-compiler/src/plugins/font.ts) Font file processing
- [image](https://github.com/fmfe/genesis/blob/master/packages/genesis-compiler/src/plugins/image.ts) Image processing
- [media](https://github.com/fmfe/genesis/blob/master/packages/genesis-compiler/src/plugins/media.ts) Media resource handling
- [style](https://github.com/fmfe/genesis/blob/master/packages/genesis-compiler/src/plugins/style.ts) Style file processing
- [template](https://github.com/fmfe/genesis/blob/master/packages/genesis-compiler/src/plugins/template.ts) Template file processing
- [vue](https://github.com/fmfe/genesis/blob/master/packages/genesis-compiler/src/plugins/vue.ts) vue file processing    
You can use the above example to gain an in-depth understanding of how plugins work.