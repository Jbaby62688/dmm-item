const {
  DobLogApi
} = require('@dob/log');
const {
  DobUtilConstant,
  DobUtilApi
} = require('@dob/util');
const {
  DmmBaseApi
} = require('@dmm/base');
const ItemError = require('../error/itemError');
const ItemUserController = require('../controller/itemUserController');

class ItemApi extends DmmBaseApi {
  static async addItem(
    {
      userId,
      itemId,
      count
    },
    {
      throwErrorFlag = true,
      ctx
    }
  ) {
    const identifier = 'ItemApi::addItem';
    
    //获取日志器
    const logger = DobLogApi.getLogger(
      {
        category: identifier
      }
    );
    
    //开始执行
    logger?.debug(`=====开始执行${identifier}=====`);
    
    try {
      //检查参数
      logger?.debug(`count: ${count}`);
      DobUtilApi.checkValue(
        {
          value: count
        },
        {
          type: DobUtilConstant.VALUE_TYPE_NUMBER,
          rule: {
            ...DobUtilConstant.VALUE_RULE_POSITIVE_BIGINT
          }
        }
      );

      //获取[物品-用户]模型
      let itemUser = ItemUserController.getModelByUniqueKey(
        {
          userId,
          itemId
        },
        {
          checkModelFlag: false,
          ctx
        }
      );

      if(itemUser === null) {
        //创建[物品-用户]模型
        itemUser = await ItemUserController.create(
          {
            userId,
            itemId,
            count
          },
          {
            ctx
          }
        );
      }
      else {
        //更新[物品-用户]模型
        let _count = itemUser.count + count;

        if(Number.isSafeInteger(_count) === false) {
          throw new ItemError(ItemError.USER_COUNT_OVERFLOW);
        }

        itemUser = await ItemUserController.update(
          {
            model: itemUser
          },
          {
            count: _count
          },
          {
            ctx
          }
        );
      }
    }
    catch(error) {
      //抛出错误
      if(throwErrorFlag === true) {
        throw error;
      }
      //返回
      else {
        return null;
      }
    }
    finally {
      //结束执行
      logger?.debug(`=====结束执行${identifier}=====`);
    }
  }

  static async subItem(
    {
      userId,
      itemId,
      count
    },
    {
      throwErrorFlag = true,
      ctx
    }
  ) {
    const identifier = 'ItemApi::subItem';
    
    //获取日志器
    const logger = DobLogApi.getLogger(
      {
        category: identifier
      }
    );
    
    //开始执行
    logger?.debug(`=====开始执行${identifier}=====`);
    
    try {
      //检查参数
      logger?.debug(`count: ${count}`);
      DobUtilApi.checkValue(
        {
          value: count
        },
        {
          type: DobUtilConstant.VALUE_TYPE_NUMBER,
          rule: {
            ...DobUtilConstant.VALUE_RULE_POSITIVE_BIGINT
          }
        }
      );

      //获取[物品-用户]模型
      let itemUser = ItemUserController.getModelByUniqueKey(
        {
          userId,
          itemId
        },
        {
          ctx
        }
      );

      if(itemUser === null) {
        throw new ItemError(ItemError.USER_ITEM_NOT_EXIST);
      }

      //更新[物品-用户]模型
      let _count = itemUser.count - count;

      if(_count < 0) {
        throw new ItemError(ItemError.USER_COUNT_NOT_ENOUGH);
      }

      itemUser = await ItemUserController.update(
        {
          model: itemUser
        },
        {
          count: _count
        },
        {
          ctx
        }
      );
    }
    catch(error) {
      //抛出错误
      if(throwErrorFlag === true) {
        throw error;
      }
      //返回
      else {
        return null;
      }
    }
    finally {
      //结束执行
      logger?.debug(`=====结束执行${identifier}=====`);
    }
  }
}

module.exports = ItemApi;