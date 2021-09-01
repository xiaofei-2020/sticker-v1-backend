const tokenTable = require('../models/token');
const accountTable = require('../models/account');
const inspirecloud = require('@byteinspire/api');
const BusinessError = require('../errors/businessError');
const BusinessErrorCode = require('../errors/businessErrorCode');
const ObjectId = inspirecloud.db.ObjectId;

/**
 * TokenService
 * Service 是业务具体实现，由 Controller 或其它 Service 调用
 * 包含账号注册，查询等
 */
class TokenService {
  async findOne(param) {
    return await tokenTable.where(param).findOne();
  }
  async create(param) {
    // 创建数据
    const tokenItem = tokenTable.create(param);
    // 保存数据
    await tokenTable.save(tokenItem);
  }
  async delete(param) {
    const tokenRecord = await this.findOne(param);
    // 使用 delete 删除这些记录
    await tokenTable.delete(tokenRecord);
  }

  async getActiveAccountByToken(token) {
    const tokenRecord = await this.findOne({token: token, expires_time: db.gt(new Date())});
    if (!tokenRecord) {
      // 不需要捕获，会有全局异常直接转换给用户
      throw BusinessError.failed(BusinessErrorCode.PERMISSION_INVALID);
    }

    return accountTable.where({_id: tokenRecord.account_id}).projection({account_email: 1, register_time: 1}).findOne();
  }
}

// 导出 Service 的实例
module.exports = new TokenService();
