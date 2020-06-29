# Page meta information
A large part of the reason for the project to do SSR rendering is to be more friendly to SEO. This article will explain how to use [vue-meta](https://vue-meta.nuxtjs.org/) to manage the information on the page


## Install dependencies
```bash
npm install vue-meta
```

## Use
:::tip
Both the `entry-client.ts` on the client and the `entry-server.ts` file on the server need to be installed

:::
```ts
import Vue from 'vue'
import VueMeta from 'vue-meta'

Vue.use(VueMeta)
```
Use in any component
```vue
<template>
    <div class="app">
        ....
    </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'app',
    metaInfo() {
        return {
            title: 'title'
        };
    }
});
</script>
```

### Get SEO configuration information
```ts
import { RenderContext } from '@fmfe/genesis-core';
import Vue from 'vue';

/**
 * Server entrance, you need to export a method, and return a Promise<Vue>
 */
export default async (renderContext: RenderContext): Promise<Vue> => {
    /**
     * Create a server application
     */
    const app = new Vue({
        // options
    });
    /**
     * After the rendering is complete, transfer the title to the index.html template
     */
    renderContext.beforeRender(() => {
        // If you need to set the keywords, description, etc. of the website, please refer to the relevant documentation: https://vue-meta.nuxtjs.org/
        const {
            title,
            meta,
            link,
            style,
            script,
            htmlAttrs,
            headAttrs,
            bodyAttrs,
            base,
            noscript
        } = app.$meta().inject();

        //Use <%- meta.title %> in the index.html file to render the title.
        Object.defineProperty(renderContext.data, 'meta', {
            enumerable: false,
            value: {
                title: title?.text() || '',
                meta: meta?.text() || '',
                link: link?.text() || '',
                style: style?.text() || '',
                script: script?.text() || '',
                htmlAttrs: htmlAttrs?.text() || '',
                headAttrs: headAttrs?.text() || '',
                bodyAttrs: bodyAttrs?.text() || '',
                base: base?.text() || '',
                noscript: noscript?.text() || ''
            }
        });
    });
    return app;
};

```
## Custom template
```ts
import path from 'path';

const ssr = new SSR({
    build: {
        template: path.resolve(__dirname, './index.html')
    }
});
```
You need to customize an html template, more [view](../core/#build-template)


## Use in template
```html
<!DOCTYPE html>
<html <%-meta.htmlAttrs%>>

<head <%-meta.bodyAttrs%>>
    <%-meta.meta%>
    <%-meta.title%>
    <%-meta.link%>
    <%-meta.style%>
    <%-style%>
</head>

<body <%-meta.headAttrs%>>
<%-html%>
<%-meta.noscript%>
<%-scriptState%>
<%-meta.script%>
<%-script%>
</body>

</html>
```