# vite-plugin-setting-css-module
## Introduction
-------
Realize the css modularity of vite project

## Originally
-------
To implement css modularity in vite + react, you need to create a *.module.css file name vite to implement style modularization.
If it is a new project, it is possible to create css files according to the naming convention specified by vite. However, if it is a project migrating to vite, it will cause great obstacles.
Most of the old project CSS file naming is not in accordance with the Vite modular naming specification to name, so this plug-in is to deal with not in accordance with the VITE specified naming specification to achieve CSS modularity.

## Method
-------
```
npm i vite-plugin-setting-css-module -D
```

```typescript
import { defineConfig } from 'vite'
import vitePluginSettingCssModule from 'vite-plugin-setting-css-module';

// https://vitejs.dev/config/
export default defineConfig({
  ...
  plugins: [
    vitePluginSettingCssModule()
  ]
  ...
})
```

## Options
- `include`(RegExp|Function) - Custom modular files.   
Example: `/*.scss/` Or `function (fileName) { return fileName.endsWith('scss') }`

- `exclude`(RegExp|Function) - Custom excluded modular css files.  
Example:`/*.global.scss/` Or `function (fileName) { return fileName.includes('.global.scss') }`

```typescript

// Or add modularity tags when referenced, for example, in the index.js file
import style from './style.scss?global'

```