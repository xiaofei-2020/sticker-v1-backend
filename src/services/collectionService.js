const collectionTable = require('../models/collection');
const resourceTable = require('../models/resource')
const inspirecloud = require('@byteinspire/api');
const ObjectId = inspirecloud.db.ObjectId;

/**
 * class CollectionService {

 * Service 是业务具体实现，由 Controller 或其它 Service 调用
 */
class CollectionService {
  async listAll(id, type, page = 1, pageSize = 10) {
    const count = await collectionTable.where({account_id: id, type}).count();
    const all = await collectionTable.where({account_id: id, type}).skip((page - 1) * 10).limit(pageSize).find();
    const data = all.map(async(item)=>{
      const resource = await resourceTable.where({_id: ObjectId(id)}).findOne();
      return {
        resource_id:item.resource_id,
        resouce_type:type,
        img:resource.img
      }
    });
    
    return {
      elements: data,
      totalElements: count,
    };
  }
}

// 导出 Service 的实例
module.exports = new CollectionService();
