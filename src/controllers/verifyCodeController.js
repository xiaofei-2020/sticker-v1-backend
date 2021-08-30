const verifyCodeService = require('../services/verifyCodeService');
const sendEmail = require("../utils/sendEamil");

/**
 * VerifyCodeController
 * Controller 是业务入口，由 HTTP 路由解析后调用
 */
class VerifyCodeController {
  /**
   * 新增验证码，并邮件发送到用户邮箱
   */
  async sendVerifyCode(req, res) {
    let { type, account_email } = req.body;
    try {
      let { verifyCode, expiresTime } = await verifyCodeService.create({ type, account_email });
      let sentInfo = await sendEmail(account_email, verifyCode, type);

      res.send({
        success: true,
        code: 10201,
        msg: '验证码新增成功并发送邮件给用户'
      });
    } catch (err) {
      res.send({
        success: false,
        code: 10500,
        msg: err.message
      });
    }
  }
}

// 导出 Controller 的实例
module.exports = new VerifyCodeController();
