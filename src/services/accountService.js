const accountTable = require('../models/account');
const inspirecloud = require('@byteinspire/api');
const ObjectId = inspirecloud.db.ObjectId;

/**
 * AccountService
 * Service 是业务具体实现，由 Controller 或其它 Service 调用
 * 包含账号注册，查询等
 */
class AccountService {

  async register(email, password) {
    return accountTable.create(
      {
        account_email: email,
        account_password: password,
        register_time: Date.now()
      }
    );
  }
}

// 导出 Service 的实例
module.exports = new AccountService();
