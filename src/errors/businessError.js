const BusinessErrorCode = require("./businessErrorCode")

class BusinessError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
    this.message = message;
  }

  static failed(errorCode, ...message) {
    if (errorCode instanceof BusinessErrorCode) {
      return new BusinessError(errorCode.code, errorCode.parseMessage(message))
    } else {
      this.failed(BusinessErrorCode.SERVER_EXCEPTION, message.length > 0 ? message.join() : '')
    }
  }
}

module.exports = BusinessError