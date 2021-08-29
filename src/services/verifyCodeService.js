const verifyCodeTable = require('../models/verifyCode');
const inspirecloud = require('@byteinspire/api');
const { VERIFY_CODE_VALID_TIME } = require('../config');
const ObjectId = inspirecloud.db.ObjectId;

// 生成 6 位随机验证码
function getVerifyCode() {
  return Math.random().toString().slice(-6);
}

/**
 * VerifyCodeService
 * Service 是业务具体实现，由 Controller 或其它 Service 调用
 */
class VerifyCodeService {
  async findOne(param) {
    return await verifyCodeTable.where(param).findOne();
  }
  async delete(list) {
    return await verifyCodeTable.delete(list);
  }

  // 新增验证码
  async create(param) {
    let { type, account_email } = param;
    let verifyCode = getVerifyCode();
    let expiresTime = new Date(Date.now() + VERIFY_CODE_VALID_TIME);

    try {
      // 查找表中是否存在条目，存在 - 执行删除
      let verifyCodeList = await this.findOne({ verify_code: verifyCode, account_email, type });
      if (verifyCodeList) {
        await this.delete(verifyCodeList);
      }

      // 创建数据
      const verifyCodeItem = verifyCodeTable.create({
        verify_code: verifyCode,
        account_email,
        type,
        expires_time: expiresTime
      });
      // 保存数据
      await verifyCodeTable.save(verifyCodeItem);

      return { verifyCode, expiresTime };
    } catch (err) {
      throw err;
    }
  }
}

// 导出 Service 的实例
module.exports = new VerifyCodeService();
