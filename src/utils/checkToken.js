const tokenService = require('../services/tokenService');
const inspirecloud = require('@byteinspire/api');
const BusinessError = require('../errors/businessError');
const BusinessErrorCode = require("../errors/businessErrorCode");
const db = inspirecloud.db;

module.exports = async function checkToken(token) {
  if (!token.trim()) {
    throw BusinessError.failed(BusinessErrorCode.INVALID_PARAMS, ", Should login!")
  }

  let tokenRecord = await tokenService.findOne({
    token,
    expires_time: db.gte(new Date())
  });

  if (!tokenRecord) {
    throw BusinessError.failed(BusinessErrorCode.INVALID_PARAMS, ", token expired or not found!")
  }
  return tokenRecord
}