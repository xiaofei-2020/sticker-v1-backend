const resourceService = require('../services/resourceService');

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

    // 分页查询资源
    let listResult = await resourceService.listAll({ keyword, type }, {offset: pageSize * page - pageSize, size: pageSize});
    res.send({
      code: 200,
      success: true,
      data: listResult
    });
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
}

// 导出 Controller 的实例
module.exports = new ResourceController();
