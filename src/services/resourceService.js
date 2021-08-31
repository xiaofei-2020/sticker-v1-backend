const resourceTable = require('../models/resource');
const inspirecloud = require('@byteinspire/api');
const ObjectId = inspirecloud.db.ObjectId;

/**
 * ResourceService
 * Service 是业务具体实现，由 Controller 或其它 Service 调用
 */
class ResourceService {
    /**
   * 新增一条资源
   * @param  resource 用于新增资源的数据，原样存进数据库
   * @return {Promise<any>} 返回实际插入数据库的数据，会增加_id，createdAt和updatedAt字段
   */
     async create(resource) {
      return await resourceTable.save(resource);
    }
}

// 导出 Service 的实例
module.exports = new ResourceService();
