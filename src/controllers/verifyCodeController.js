const verifyCodeService = require('../services/verifyCodeService');

/**
 * VerifyCodeController
 * Controller 是业务入口，由 HTTP 路由解析后调用
 * 包含待办事项的增删改查功能
 */
class VerifyCodeController {
  /**
   * 列出所有待办事项
   * 响应格式
   * {
   *   list: [todo1, todo2]
   * }
   * @param req Express 的请求参数
   * @param res Express 的响应参数
   */
  async listAll(req, res) {
    // 调用 Service 层对应的业务处理方法
    const list = await todoService.listAll();
    res.send({list});
  }
}

// 导出 Controller 的实例
module.exports = new VerifyCodeController();
