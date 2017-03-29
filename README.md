# node-servers
Use Node.js to build the local server.

[![NPM version](https://img.shields.io/npm/v/node-servers.svg)](https://github.com/hideweb/node-servers)
[![npm](https://img.shields.io/npm/dm/node-servers.svg)](https://github.com/hideweb/node-servers)
[![npm](https://img.shields.io/npm/l/node-servers.svg)](https://github.com/hideweb/node-servers)

## Installation

```bash
$ npm install node-servers
```

## Example
#### 1、需要搭建服务器文件夹创建server.js文件
#### 2、server.js文件
```js
var server = require('node-servers')({PORT:3000});
```
#### 3、执行命令启动服务
```bash
node server.js
```

#### 4、浏览器访问 http://localhost:3000/

