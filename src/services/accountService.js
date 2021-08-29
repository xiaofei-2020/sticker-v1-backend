const accountTable = require('../models/account');
const inspirecloud = require('@byteinspire/api');
const BusinessError = require('../errors/businessError');
const BusinessErrorCode = require('../errors/businessErrorCode');
const ObjectId = inspirecloud.db.ObjectId;

/**
 * AccountService
 * Service 是业务具体实现，由 Controller 或其它 Service 调用
 * 包含账号注册，查询等
 */
class AccountService {
  async findOne(param) {
    return await accountTable.where(param).findOne();
  }

  async register(email, password) {
    // 查找表中是否存在条目
    let accountList = await this.findOne({ account_email: email });
    if (accountList) {
      throw BusinessError.failed(BusinessErrorCode.ACCOUNT_ALREADY_EXISTS);
    }

    // 创建数据
    const accountItem = accountTable.create({
      account_email: email,
      account_password: password,
      register_time: new Date()
    });
    // 保存数据
    let accountInfo = await accountTable.save(accountItem);
    return accountInfo;
  }
}

// 导出 Service 的实例
module.exports = new AccountService();
