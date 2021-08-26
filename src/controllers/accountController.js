const inspirecloud = require('@byteinspire/api');
const accountService = require('../services/accountService');
const verifyCodeService = require('../services/verifyCodeService');
const BusinessError = require("../errors/businessError");
const BusinessErrorCode = require("../errors/businessErrorCode");
const db = inspirecloud.db;

/**
 * AccountController
 * Controller 是业务入口，由 HTTP 路由解析后调用
 * 包含待办事项的增删改查功能
 */
class AccountController {

  /**
   * 注册账号
   */
  async register(req, res) {
    console.log('req.body: ', req.body);
    let { email, password, verify_code } = req.body;
    // TODO: 1. 校验验证码 有效性，时效性
    let verifyCodeRecord = await verifyCodeService.findOne({
      account_email: email,
      verify_code: verify_code,
      expires_time: db.gt(new Date())
    });

    // console.log('verifyCodeRecord: ', verifyCodeRecord);
    // if (!verifyCodeRecord) {
    //   throw BusinessError.failed(BusinessErrorCode.INVALID_PARAMS, ", verify code expired or not found!")
    // }

    // TODO: 2. 新增用户数据
    accountService.register(email, password).then(async accountRecord => {
      console.log('accountRecord: ', accountRecord);
      res.send("test");
      // // TODO: 3. 用户登录
      // if (accountRecord.dataValues.account_id) {
      //   let loginToken = await sequelize.models.token.create({
      //     account_id: accountRecord.dataValues.account_id,
      //     token: uuidv4(),
      //     expires_time: Date.now() + LOGIN_VALID_TINE
      //   });

      //   console.log('loginToken: ', loginToken.dataValues);
      //   res.send(loginToken.dataValues.token);
      // } else { // 用户数据插入失败
      //   throw BusinessError.failed(BusinessErrorCode.SERVER_EXCEPTION, " Save account error");
      // }
    }).catch(err => {
      console.log(err.name);
      if (err.name == "SequelizeUniqueConstraintError") {
        res.send("账号已存在 " + email);
      } else {
        console.log(err);
      }
    });
  }
}

// 导出 Controller 的实例
module.exports = new AccountController();
