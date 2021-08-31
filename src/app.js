const path = require('path');
const router = require('./routers/router');
const BusinessError = require("./errors/businessError");
const BusinessErrorCode = require("./errors/businessErrorCode");

const express = require('express');

const app = express();

// 为应用使用中间件
// 静态文件中间件
app.use(express.static(path.join(__dirname, '../public')));
// 请求体 parse 中间件，用于 parse json 格式请求体
app.use(express.json());

// 为应用使用路由定义
// 待办事项业务路由
app.use('/api', router);

// 若无匹配业务路由，则匹配 404 路由，代表访问路径不存在
app.use(notFound);
/** 若前面的路由抛错，则封装为错误响应返回
 * 错误响应格式为
 * {
 *   error: message
 * }
*/
app.use(errorHandler);

function notFound(req, res) {
  res.status(404);
  res.send({
    success: false,
    code: 404,
    message: 'Not Found!'
  });
}

function errorHandler(err, req, res, next) {
  if (err instanceof BusinessError) {
    console.warn("handled business error", err);
    res.send({
      success: false,
      code: err.code,
      message: err.message
    });
  } else {
    console.error("unhandled Error", err);
    res.send({
      success: false,
      code: BusinessErrorCode.SERVER_EXCEPTION.code,
      message: BusinessErrorCode.SERVER_EXCEPTION.parseMessage()
    });
  }
}
// 导出 Express 对象
module.exports = app;
