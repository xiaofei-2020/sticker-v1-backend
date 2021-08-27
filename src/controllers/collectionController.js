const collectionService = require('../services/collectionService');

/**
 * CollectionController
 * Controller 是业务入口，由 HTTP 路由解析后调用
 */
class CollectionController {
  async listAll(req, res) {
    const list = await collectionService.listAll(req.headers.token, req.params.type);
    res.send({
      success: true,
      code: 1,
      msg: '',
      data: list || [],
    });
  }

}

// 导出 Controller 的实例
module.exports = new CollectionController();
