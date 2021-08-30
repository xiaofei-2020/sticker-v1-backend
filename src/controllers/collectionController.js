const collectionService = require('../services/collectionService');

/**
 * CollectionController
 * Controller 是业务入口，由 HTTP 路由解析后调用
 */
class CollectionController {
  async listAll(req, res) {
    const list = await collectionService.listAll(req.headers.token, req.params.type,req.params.page,req.params.pageSize);
    res.send({
      success: true,
      code: 10200,
      msg: '',
      data: list,
    });
  }

  /**
 * 删除一条收藏
 * 响应格式
 * {
 *   success: Boolean,
 *   code?: String, // 按照http状态码的规则, 在前面加 10, 用以区分
 *   msg?: String,
 *   data?: string
 * }
 * @param req Express 的请求参数
 * @param res Express 的响应参数
 */
  async delete(req, res) {
    // 调用 Service 层对应的业务处理方法
    await collectionService.delete(req.params.id);
    res.send({
      success: true,
      code: 10200,
      msg: '删除成功',
      data: ''
    });
  }
}

// 导出 Controller 的实例
module.exports = new CollectionController();
