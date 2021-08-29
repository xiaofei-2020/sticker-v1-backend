const tokenTable = require('../models/token');
const inspirecloud = require('@byteinspire/api');
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
}

// 导出 Service 的实例
module.exports = new TokenService();
