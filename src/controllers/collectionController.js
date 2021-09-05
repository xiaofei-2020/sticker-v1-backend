const BusinessError = require('../errors/businessError');
const BusinessErrorCode = require("../errors/businessErrorCode");
const collectionService = require('../services/collectionService');
const resourceService = require('../services/resourceService');
const tokenService = require('../services/tokenService');
const inspirecloud = require('@byteinspire/api');
const ObjectId = inspirecloud.db.ObjectId;


/**
 * CollectionController
 * Controller 是业务入口，由 HTTP 路由解析后调用
 */
class CollectionController {
  async listAll(req, res) {
    let { type, page, pageSize } = req.query;
    if (!pageSize && pageSize !== 0) {
      pageSize = 10;
    }

    if (!page) {
      page = 1;
    }

    // bug修复: 当前端传过来的type为空时导致的bug
    if(!type || type  === "all") {
      type = /.*/
    }

    // 修复pageSize为字符串导致的bug --腾飞
    page = Number(page);
    pageSize = Number(pageSize);
    const token = req.headers.token;
    const tokenRecord = await tokenService.getActiveAccountByToken(token);

    const list = await collectionService.listAll(tokenRecord._id, type, page, pageSize);
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
    const token = req.headers.token;
    const tokenRecord = await tokenService.getActiveAccountByToken(token);

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
      const token = req.headers.token;
      const tokenRecord = await tokenService.getActiveAccountByToken(token);

      // 查找该资源是否存在
      const {resource_id} = req.body;
      const resource = await resourceService.findOne(resource_id);
      if (!resource) {
        throw BusinessError.failed(BusinessErrorCode.INVALID_PARAMS, ", resource not found!")
      }

      // 查找当前用户的所有收藏, 判断是否已收藏该资源
      const collectionRecord = await collectionService.listAll(tokenRecord._id, resource.type, 1, 1000)
      let isExist = collectionRecord.elements.findIndex(c => {
        return c.resource_id.toString() === resource_id;
      }) > -1
      if (isExist) {
        throw BusinessError.failed(BusinessErrorCode.INVALID_PARAMS, ", collection already exist!")
      }
  
      await collectionService.create({type: resource.type, resource_id: resource._id, account_id: tokenRecord._id});
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
