const collectionService = require('../services/collectionService');
const resourceService = require('../services/resourceService');

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
    /**
   * 新增一条收藏
   * 响应格式
   * {
   *  success (boolean, required)
   *  code (string, optional)   -- 错误码，401 登陆过期或者需要登录；20409 资源已存在；
   *  msg (string, optional)
   * }
   * 请求格式
   * {   // body
   *  resource_id (number, required)
   * }
   * @param req Express 的请求参数
   * @param res Express 的响应参数
   */
     async create(req, res) {
      const {resource_id, account_id} = req.body;
      const { type } = await resourceService.findById(resource_id)
  
      await collectionService.create({type, resource_id, account_id});
      res.send(
        {
          success: true,
          code: 10200,
          msg: 'ok',
        }
      );
    }
}

// 导出 Controller 的实例
module.exports = new CollectionController();
