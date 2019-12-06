# mock-server

一个 server 模拟工具, 可配置响应, 提供接口获取某个请求的详细数据

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


## Motivation

在 IE 11 中使用 selenium 测试 [ctrl+v 粘贴功能的时候](https://github.com/Jiang-Xuan/tuchuang.space/issues/36), 没有找到 spies 测试法来测试浏览器是否真正的发起了请求并且传入了合适的参数, 所以采用 mock 测试法, 这里的 mock-server 监听所有来临的请求并且提供接口查询该 mock-server 接收到的请求

## MVP 版本

该项目处于 [MVP(Minimum Viable Product)](https://en.wikipedia.org/wiki/Minimum_viable_product) 开发阶段, 如果想了解 MVP 阶段会提供什么功能, 查看 [MVP milestone](https://github.com/Jiang-Xuan/mock-server/milestone/1)
