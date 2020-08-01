# Postcss
The program does not provide the corresponding parameter configuration, you can only modify the configuration of [Postcss](https://www.npmjs.com/package/postcss-loader) in the form of a plug-in.

## Write Postcss plugin
```ts
import { Plugin, PostcssOptions } from '@fmfe/genesis-core';

export class PostcssPlugin extends Plugin {
    public postcss(config: PostcssOptions) {
        config.plugins.push({
            // Plugin
        });
        // example: config.plugins.push(require('tailwindcss'))
    }
}
```
`genesis.dev.ts` and `genesis.build.ts` use this plugin
```ts
ssr.plugin.use(PostcssPlugin);
```