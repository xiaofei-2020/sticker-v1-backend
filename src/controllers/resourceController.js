const resourceService = require('../services/resourceService');
const tokenService = require('../services/tokenService');

/**
 * ResourceController
 * Controller 是业务入口，由 HTTP 路由解析后调用
 */
class ResourceController {
  async listAll(req, res) {
    let { keyword, type, page, pageSize } = req.query;
    if (!pageSize && pageSize !== 0) {
      pageSize = 10;
    }

    if (!page) {
      page = 1;
    }

    if (keyword) {
      keyword = new RegExp(`.*${keyword}.*`);
    }

    // 修复pageSize为字符串导致的bug --腾飞
    page = Number(page);
    pageSize = Number(pageSize);

    // 分页查询资源
    let listResult = await resourceService.listAll({ content: keyword, type }, {offset: pageSize * page - pageSize, size: pageSize});
    res.send({
      code: 200,
      success: true,
      data: listResult
    });
  }

  /**
   * 新增一条资源
   * 响应格式
   * {
   *  success (boolean, required)
   *  code (string, optional)   -- 错误码，401 登陆过期或者需要登录；20409 资源已存在；
   *  msg (string, optional)
   *  resource_id(number, required)
   * }
   * 请求格式
   * {   // body
   *  type (string, require) 表情包类别
   *  account_id (objectID, require)
   *  img (string, require)  -- 图片base64编码后
   *  content (string, require) 图片文字信息
   * }
   * @param req Express 的请求参数
   * @param res Express 的响应参数
  */
  async create(req, res) {
    const { type, account_id, img, content } = req.body;

    const result = await resourceService.create({ type, account_id, img, content });
    res.send(
      {
        success: true,
        code: 10200,
        msg: 'ok',
        resource_id: result._id,
      }
    );
  }

  async findOne(req, res) {
    let {resourceID} = req.params;
    console.log(resourceID);
    let resource = await resourceService.findOne(resourceID);
    res.send({
      code: 200,
      success: true,
      data: resource
    })
  }
  
  /**
   * 新增一条资源
   * 响应格式
   * {
   *  success (boolean, required)
   *  code (string, optional)   -- 错误码，401 登陆过期或者需要登录；20409 资源已存在；
   *  msg (string, optional)
   *  resource_id(number, required)
   * }
   * 请求格式
   * {   // body
   *  type (string, require) 表情包类别
   *  img (string, require)  -- 图片base64编码后
   *  content (string, require) 图片文字信息
   * }
   * @param req Express 的请求参数
   * @param res Express 的响应参数
  */
  async create(req, res) {
    const token = req.headers.token;
    const tokenRecord = await tokenService.getActiveAccountByToken(token);
    const { type, img, content } = req.body;

    const result = await resourceService.create({ type, account_id: tokenRecord._id, img, content });
    res.send(
      {
        success: true,
        code: 10200,
        msg: 'ok',
        resource_id: result._id,
      }
    );
  }
}

// 导出 Controller 的实例
module.exports = new ResourceController();
