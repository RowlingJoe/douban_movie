# 豆瓣电影

## 目录结构

```
app
  正在热映
    模板
    控制器
  即将上映
    模板
    控制器
  Top 250
    模板
    控制器
  电影详情
    模板
    控制器
index.html
```

## bower

bower 是一个基于 Node.js 开发的一个 CLI JavaScript 包管理工具，类似于 yarn。

npm：node package manager

### Install Bower

- node
- npm
- git

```bash
npm install -g bower
```

### bower.json

```bash
bower init
```

### install package

> 提示：不要使用 bower 去安装和管理 node 包

```bash
bower install --save jquery
```

bower 默认情况下会把包安装到 bower_components 目录。

### 修改包安装路径

在项目根目录下创建一个文件：`.bowerrc`：

```json
{
  "directory": "指定安装路径"
}
```

---

## Develop

```bash
bower install
```

## browser-sync

> 能解决修改完代码，自动刷新浏览器

### 安装

```
npm install -g browser-sync
```

### 基本使用

```
browser-sync start --server --files "要监视的文件路径"
browser-sync start --server --files "css/*.css"
browser-sync start --server --files "css/*.css, js/*.js"
browser-sync start --server --files "css/*.css, app/**/*.js"
```

### 管理后台

## 豆瓣 API 接口

- https://api.douban.com
- https://api.douban.com/v2/movie/in_theaters

## 分页

- start
  + 从哪开始
- count
  + 取几条
- total
  + 总记录数

每页显示 5 条，查看第 1 页

0 5   1
5 5   2
10 5  3
15 5  4

(n-1) * 5  5
