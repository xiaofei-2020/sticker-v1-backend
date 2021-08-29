const tokenService = require('../services/tokenService');
const accountService = require('../services/accountService');
const { v4: uuidv4 } = require('uuid');
const { saltValue, LOGIN_VALID_TIME } = require('../config');
const BusinessError = require('../errors/businessError');
const BusinessErrorCode = require('../errors/businessErrorCode');
const RsaService = require('../services/rsaService');

/**
 * TokenController
 * Controller 是业务入口，由 HTTP 路由解析后调用
 */
class TokenController {
  // 登录
  async login(req, res) {
    let { email, password } = req.body;

    // password 解密
    let plaintPass = RsaService.decrypt(password);

    // 1. 校验用户名和密码
    let accountRecord = await accountService.findOne({
      account_email: email,
      account_password: RsaService.sign(plaintPass + saltValue)
    });
    if (!accountRecord) {
      throw BusinessError.failed(BusinessErrorCode.RESOURCE_NOT_FOUND, '该邮箱没有注册');
    }

    // 2. 生成 token 数据并返回
    let token = uuidv4();
    await tokenService.create({
      account_id: accountRecord._id,
      token,
      expires_time: new Date(Date.now() + LOGIN_VALID_TIME)
    });

    res.send({
      success: true,
      code: 10201,
      msg: '登录成功',
      data: token
    });
  }

  // 账号登出
  async delete(req, res) {
    let { token } = req.params;
    await tokenService.delete({ token });

    res.send({
      success: true,
      code: 10200,
      msg: '登出成功'
    });
  }
}

// 导出 Controller 的实例
module.exports = new TokenController();
