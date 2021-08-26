const todoTable = require('../models/todoTable');
const inspirecloud = require('@byteinspire/api');
const ObjectId = inspirecloud.db.ObjectId;

/**
 * TokenService
 * Service 是业务具体实现，由 Controller 或其它 Service 调用
 * 包含账号注册，查询等
 */
class TokenService {
}

// 导出 Service 的实例
module.exports = new TokenService();
