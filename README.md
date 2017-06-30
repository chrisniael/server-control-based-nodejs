# 服务器控制工具

## 部署

安装组件

```
npm install
```

启动

```
npm start
```

推荐使用 `pm2` 管理 Node.JS 项目。

这里使用 `14853` 端口，使用浏览器打开 `http://localhost:14853` 访问。

## 配置

配置文件 `config.js`，可以在里面添加新的服务器和功能，功能名和对应的脚本名要保持一致，否则执行的时候会读取不到对应的脚本文件，例如：

```
'update-compile-restart-server': {
    'title': '做个新的服务器',
    'style': 'primary',
    'confirm': true
}
```

对应的脚本文件为 `action/update-compile-restart-server.sh`，特别注意脚本代码开头*不要添加* `#!/bin/sh`。
