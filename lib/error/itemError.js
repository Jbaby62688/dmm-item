const {
  DmmBaseError
} = require('@dmm/base');
const ItemConstant = require('../constant/itemConstant');

class ItemError extends DmmBaseError {
  static USER_ITEM_NOT_EXIST = {code: 10001, msg: '用户物品不存在'};
  
  static USER_COUNT_NOT_ENOUGH = {code: 30001, msg: '物品数量不足'};
  static USER_COUNT_OVERFLOW = {code: 30002, msg: '物品数量溢出'};

  constructor(
    {
      code,
      msg
    }
  ) {
    super(
      {
        code,
        msg
      }
    );
    this.module = ItemConstant.MODULE_NAME;
  }
}

module.exports = ItemError;