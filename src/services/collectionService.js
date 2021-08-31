const collectionTable = require('../models/collection');
const resourceTable = require('../models/resource');
const inspirecloud = require('@byteinspire/api');
const ObjectId = inspirecloud.db.ObjectId;

/**
 * class CollectionService {

 * Service 是业务具体实现，由 Controller 或其它 Service 调用
 */
class CollectionService {
  async listAll(id, type, page = 1, pageSize = 10) {
    const count = await collectionTable.where({ account_id: id, type }).count();
    const all = await collectionTable.where({ account_id: id, type }).skip((page - 1) * 10).limit(pageSize).find();
    const data = all.map(async (item) => {
      const resource = await resourceTable.where({ _id: ObjectId(id) }).findOne();
      return {
        resource_id: item.resource_id,
        resouce_type: type,
        img: resource.img
      }
    });

    return {
      elements: data,
      totalElements: count,
    };
  }
  /**
 * 删除一条收藏
 * @param id 收藏的 _id
 * 若不存在，则抛出 404 错误
 */
  async delete(id) {
    const result = await collectionTable.where({ resource_id: ObjectId(id) }).delete();
    if (result.deletedCount === 0) {
      throw BusinessError.failed(BusinessErrorCode.INVALID_PARAMS, `, collection:${id} not found`)
    }
  }
  /**
   * 新增一条收藏
   * @param  collection 用于新增收藏的数据，原样存进数据库
   * @return {Promise<any>} 返回实际插入数据库的数据，会增加_id，createdAt和updatedAt字段
   */
   async create(collection) {
    return await collectionTable.save(collection);
  }
}

// 导出 Service 的实例
module.exports = new CollectionService();
