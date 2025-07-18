## 微前端测试项目

本项目是一个用于验证 React 主应用通过 RsBuild Module Federation 动态加载微前端子应用的实验项目。

### ✅ 支持特性
* 主应用：React + Ant Design + ProForm
* *子应用支持：
* ✅ React 组件（通过 Module Federation 动态加载）
* ✅ Vue 2 子应用（通过 mount 函数挂载）
* ✅ Vue 3 子应用（通过 mount 函数挂载）
* 可通过 UI 动态切换加载不同子应用模块
* 子应用支持传入 props（如 title 和事件回调）

### 🧪 实验发现（Vue2 与 Vue3 并存问题）

在同时接入 Vue2 与 Vue3 微前端子应用的过程中，发现如下问题：
* Vue2 与 Vue3 都使用了全局作用域的运行时（如 Vue 全局 API、指令等），导致在某些环境下存在 运行时语法冲突。
* Vue2 子应用卸载时需要使用 appendChild + $mount 模式，否则可能影响主容器 DOM。
* Vue3 子应用使用 createApp().mount(el)，如果在同一个 DOM 元素上重复挂载/卸载，可能会触发 __VUE_HMR_RUNTIME__ 错误（在开发模式下）。

### 🚫 不推荐的做法
* 同时运行 Vue2 与 Vue3 应用（共享运行时可能导致冲突）
* 使用 Webpack DevServer 加载远程 Vue 子应用（建议使用生产构建）

### ✅ 建议
* 使用 build 模式构建 Vue 子应用，并通过静态服务器提供 remoteEntry.js
* 使用 React 中的 useRef+unmountFn 来控制 Vue 子应用的卸载
* 在 Vue2 中使用 el.appendChild(div) 方式挂载，避免替换主容器 DOM

### 📁 项目结构简要说明
* mirco-app react 微前端依赖
* mirco-home react 微前端静态依赖主项目
* mirco-home-dynamic react 微前端动态依赖主项目
* mirco-vue2 vue2 微前端依赖
* mirco-vue3 vue3 微前端依赖


### PS
* 如需复现，请先分别启动 React 主应用（动态依赖）、React 子应用、Vue2 子应用、Vue3 子应用，并在页面中选择对应类型进行加载测试。
* 在mirco-home-dynamic的本地代码上传，是对mirco-app执行build打包的dist压缩上传的。
