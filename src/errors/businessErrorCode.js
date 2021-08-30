class BusinessErrorCode {
  code;
  messageTmplate;

  set code(code) {
    throw Error("Invalid Operation! set value to `BusinessErrorCode.code`");
  }

  set messageTmplate(code) {
    throw Error("Invalid Operation! set value to `BusinessErrorCode.messageTmplate`");
  }

  constructor(code, messageTmplate) {
    this.code = code;
    this.messageTmplate = messageTmplate;
  }

  parseMessage() {
    if (arguments.length == 0) {
      return this.messageTmplate;
    }

    let resultMsg = this.messageTmplate;
    for (let i = 0; i < arguments.length; i++) {
      resultMsg = resultMsg.replace("{" + i + "}", arguments[i]);
    }
    return resultMsg.replace(/\{\d+\}/g, "");
  }
}

BusinessErrorCode.PERMISSION_INVALID = new BusinessErrorCode(401, "Should Login!");

BusinessErrorCode.SOURCE_REFLECT = new BusinessErrorCode(409, "Resource reflect, %s");

BusinessErrorCode.SERVER_EXCEPTION = new BusinessErrorCode(502, "Unknown server error! {0}");

BusinessErrorCode.INVALID_PARAMS = new BusinessErrorCode(10401, "Invalid params {0}");

BusinessErrorCode.ACCOUNT_ALREADY_EXISTS = new BusinessErrorCode(10409, "Account already exists!");

BusinessErrorCode.RESOURCE_NOT_FOUND = new BusinessErrorCode(20404, "Resource not found! {0}");

module.exports = BusinessErrorCode