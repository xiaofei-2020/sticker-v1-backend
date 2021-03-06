const FileService = require('../services/fileService');

/**
 * FileController
 * Controller 是业务入口，由 HTTP 路由解析后调用
 */
class FileController {
  async download(req, res) {

    const rawData = await FileService.download(req.query.src);

    res.header('Content-Disposition','attachment');
    res.header('Content-Type', 'application/octet-stream');

    res.send({
      success: true,
      code: 10200,
      msg: '',
      data: rawData
    });
  }

}

// 导出 Controller 的实例
module.exports = new FileController();
