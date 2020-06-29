# Babel
The program does not provide the corresponding parameter configuration, you can only modify the configuration of [Babel](https://www.babeljs.cn/) in the form of a plug-in.

## Write a Babel plugin
```ts
import { Plugin, BabelConfig } from '@fmfe/genesis-core';

export class BabelPlugin extends Plugin {
    public babel(config: BabelConfig) {
        // config.presets
        // config.plugins
        // Modified example
        config.presets.forEach((preset) => {
            if (Array.isArray(preset) && preset[0] === '@babel/preset-env') {
                // Modify babel preset-env configuration
            }
        });
    }
}
```
`genesis.dev.ts` and `genesis.build.ts` use this plugin
```ts
ssr.plugin.use(BabelPlugin);
```