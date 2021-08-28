const collectionTable = require('../models/collection');
const inspirecloud = require('@byteinspire/api');
const ObjectId = inspirecloud.db.ObjectId;

/**
 * class CollectionService {

 * Service 是业务具体实现，由 Controller 或其它 Service 调用
 */
class CollectionService {
  /**
 * 删除一条收藏
 * @param id 收藏的 _id
 * 若不存在，则抛出 404 错误
 */
  async delete(id) {
    const result = await collectionTable.where({ resource_id: ObjectId(id) }).delete();
    if (result.deletedCount === 0) {
      const error = new Error(`collection:${id} not found`);
      error.status = 10404;
      throw error;
    }
  }
}

// 导出 Service 的实例
module.exports = new CollectionService();
