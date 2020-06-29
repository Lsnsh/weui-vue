## WeUI-Vue
> WeUI-Vue 是基于 [WeUI](https://github.com/Tencent/weui) 封装的第三方 Vue 组件库，WeUI 是一套同微信原生视觉体验一致的基础样式库，由微信官方设计团队为微信内网页和微信小程序量身设计，令用户的使用感知更加统一。

当前 `WeUI` 版本：[v2.4.0](https://github.com/Tencent/weui/releases/tag/v2.4.0)

## 安装
```shell
npm install weui-vue -S
```

## 快速开始
``` javascript
import Vue from 'vue'
import WeUIVue from 'weui-vue'

Vue.use(WeUIVue)

// or
import {
  Button,
  Dialog
  // ...
} from 'weui-vue'

Vue.component(Button.name, Button)
Vue.component(Dialog.name, Dialog)
```

## 更新日志
[github releases](https://github.com/Lsnsh/weui-vue/releases)中记录了每个发布版本的详细更改。

## 许可证
[MIT](LICENSE)