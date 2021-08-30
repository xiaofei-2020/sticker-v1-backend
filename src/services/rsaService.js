const NodeRSA = require('node-rsa');
const { PRIVATE_KEY } = require('../config');
const BusinessError = require('../errors/businessError');
const BusinessErrorCode = require('../errors/businessErrorCode');

// RSA: 生成密钥
const rsaKey = new NodeRSA({ b: 512 });
rsaKey.setOptions({ encryptionScheme: 'pkcs1' }); //指定与客户端一样的加密格式
const PK_BUILDER = rsaKey.importKey(PRIVATE_KEY);

class RsaService {
  decrypt(text) {
    try {
      console.log("need decrypt str: ", text);
      return PK_BUILDER.decrypt(text, 'utf8');
    } catch (err) {
      throw BusinessError.failed(BusinessErrorCode.INVALID_PARAMS, " account or password invalid!")
    }
  }

  sign(text) {
    return PK_BUILDER.sign(text, 'base64', 'utf8');
  }
}

// 导出 Service 的实例
module.exports = new RsaService();