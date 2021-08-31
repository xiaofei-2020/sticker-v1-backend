const resourceTable = require('../models/resource');
const inspirecloud = require('@byteinspire/api');
const BusinessError = require('../errors/businessError');
const BusinessErrorCode = require('../errors/businessErrorCode');
const ObjectId = inspirecloud.db.ObjectId;

/**
 * ResourceService
 * Service 是业务具体实现，由 Controller 或其它 Service 调用
 */
class ResourceService {
  async listAll(param, page) {
    console.log(param, page);
    let [dataList, dataCount] = await Promise.allSettled([
      resourceTable.where(param).skip(page.offset).limit(page.size).find(),
      resourceTable.where(param).count()
    ]
    );
    console.log(dataList.value, dataCount.value);
    return {
      elements: dataList.value,
      totalElements: dataCount.value
    };
  }

  async findOne(resourceId) {
    try {
      return resourceId ? resourceTable.where({id: ObjectId(resourceId)}).findOne() : null;
    } catch (err) {
      if (err instanceof TypeError) {
        throw BusinessError.failed(BusinessErrorCode.INVALID_PARAMS, resourceId);
      }
    }
  }
}

// 导出 Service 的实例
module.exports = new ResourceService();
