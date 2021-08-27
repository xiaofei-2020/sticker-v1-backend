const collectionTable = require('../models/collection');
const inspirecloud = require('@byteinspire/api');
const ObjectId = inspirecloud.db.ObjectId;

/**
 * class CollectionService {

 * Service 是业务具体实现，由 Controller 或其它 Service 调用
 */
class CollectionService {
  async listAll(id, type) {
    const all = await collectionTable.where({account_id: id, type}).find();
    return all;
  }
}

// 导出 Service 的实例
module.exports = new CollectionService();
