# vite-plugin-setting-css-module
## 简介
-------
实现vite项目css模块化

## 原由
-------
vite + react中要实现css模块化需要创建css文件为 *.module.css的文件名vite才能进行样式模块化的处理。
如果是新建项目是可以按照vite规定的命名规范去创建css文件，但是如果是项目迁移到vite这样会造成很大的阻碍，
大部老项目css文件命名不是按照vite模块化命名规范去命名的，所以该插件就是去处理不按照vite规定的命名规范去实现css模块化。

## 使用方法
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
## 参数
- `include`(RegExp|Function) - 自定义模块化的文件。  
例：`/*.scss/` 或 `function (fileName) { return fileName.endsWith('scss') }`

- `exclude`(RegExp|Function) - 自定义排除模块化的css文件。  
例：`/*.global.scss/` 或 `function (fileName) { return fileName.includes('.global.scss') }`

```typescript

// 或者也可以在引用时添加模块化标记， 例如：在index.js文件中
import style from './style.scss?global'

```