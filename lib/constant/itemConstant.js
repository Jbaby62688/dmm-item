const {
  DobUtilConstant
} = require('@dob/util');

class BagConstant {
  static MODULE_NAME = 'item';

  static PROP_ITEM_ID_VALUE_GOLD = 1;
  static PROP_ITEM_ID_TYPE = DobUtilConstant.VALUE_TYPE_NUMBER;
  static PROP_ITEM_ID_RULE = {
    list: [
      this.PROP_ITEM_ID_VALUE_GOLD
    ]
  }

  static PROP_USER_COUNT_TYPE = DobUtilConstant.VALUE_TYPE_NUMBER;
  static PROP_USER_COUNT_RULE = {
    ...DobUtilConstant.VALUE_RULE_UNSIGNED_BIGINT
  }
}

module.exports = BagConstant;