const inspirecloud = require('@byteinspire/api');
const accountService = require('../services/accountService');
const verifyCodeService = require('../services/verifyCodeService');
const tokenService = require('../services/tokenService');
const BusinessError = require("../errors/businessError");
const BusinessErrorCode = require("../errors/businessErrorCode");
const { v4: uuidv4 } = require('uuid');
const { saltValue, LOGIN_VALID_TIME } = require('../config');
const RsaService = require('../services/rsaService');
const db = inspirecloud.db;

/**
 * AccountController
 * Controller 是业务入口，由 HTTP 路由解析后调用
 */
class AccountController {
  /**
   * 注册账号
   */
  async register(req, res) {
    let { email, password, verify_code, type } = req.body;

    // 1. 校验验证码 有效性，时效性
    let verifyCodeRecord = await verifyCodeService.findOne({
      account_email: email,
      verify_code: verify_code,
      type,
      expires_time: db.gte(new Date())
    });

    if (!verifyCodeRecord) {
      throw BusinessError.failed(BusinessErrorCode.INVALID_PARAMS, ", verify code expired or not found!")
    }

    // 2. 新增用户数据
    let plaintPass = RsaService.decrypt(password);
    console.log("plaintPass ", plaintPass);
    let sign = RsaService.sign(plaintPass + saltValue);
    console.log("sign", sign);
    let accountRecord = await accountService.register(email, sign);

    //  3. 用户登录
    let token = uuidv4();
    await tokenService.create({
      account_id: accountRecord._id,
      token,
      expires_time: new Date(Date.now() + LOGIN_VALID_TIME)
    });

    res.send({
      success: true,
      code: 10201,
      msg: '新增用户数据，并自动登录',
      data: token

    });
  }
}

// 导出 Controller 的实例
module.exports = new AccountController();
