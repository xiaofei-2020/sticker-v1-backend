const collectionTable = require('../models/collection');
const resourceTable = require('../models/resource')
const inspirecloud = require('@byteinspire/api');
const ObjectId = inspirecloud.db.ObjectId;

/**
 * class CollectionService {

 * Service 是业务具体实现，由 Controller 或其它 Service 调用
 */
class CollectionService {
  async listAll(id, type) {
    const all = await collectionTable.where({account_id: id, type}).find();
    const data = all.map(item=>{
      const resource = resourceTable.where({_id: ObjectId(id)}).find();
      return {
        resource_id:item.resource_id,
        resouce_type:type,
        img:resource.img
      }
    })
    return data;
  }
}

// 导出 Service 的实例
module.exports = new CollectionService();
