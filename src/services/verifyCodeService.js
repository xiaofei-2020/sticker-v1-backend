const verifyCodeTable = require('../models/verifyCode');
const inspirecloud = require('@byteinspire/api');
const ObjectId = inspirecloud.db.ObjectId;

/**
 * VerifyCodeService
 * Service 是业务具体实现，由 Controller 或其它 Service 调用
 */
class VerifyCodeService {
    async findOne(param) {
        return await verifyCodeTable.where(param).findOne();
    }
}

// 导出 Service 的实例
module.exports = new VerifyCodeService();
