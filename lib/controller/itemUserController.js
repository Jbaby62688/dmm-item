const {
  DobLogApi
} = require('@dob/log');
const {
  DobUtilConstant,
  DobUtilApi
} = require('@dob/util');
const {
  DmmBaseConstant,
  DmmBaseController
} = require('@dmm/base');
const ItemConstant = require('../constant/itemConstant');
const ItemError = require('../error/itemError');
const ItemConfig = require('../config/itemConfig');
const ItemUserModel = require('../model/itemUserModel');

class ItemUserController extends DmmBaseController {
  /**
   * @description 模型getter
   * 
   * @static
   * 
   * @returns {ItemUserModel}
   */
  static get Model() {
    return ItemUserModel;
  }


  /**
   * @description 检查模型
   * 
   * @static
   * 
   * @param {Object} param1
   * @param {ItemUserModel} param1.model 模型
   * @param {Object} param2
   * @param {Boolean} [param2.throwErrorFlag = true] 抛出错误标志
   * @param {Object} param2.ctx 上下文
   * 
   * @returns {Boolean}
   */
  static checkModel(
    {
      model
    },
    {
      throwErrorFlag = true,
      ctx
    } = {}
  ) {
    const identifier = 'DmmItemUserController::checkModel';

    //获取日志器
    const logger = DobLogApi.getLogger(
      {
        category: identifier
      }
    );

    //开始执行
    logger.debug(`=====开始执行${identifier}=====`);

    try {
      super.checkModel(
        {
          model
        },
        {
          ctx
        }
      );

      //返回
      return true;
    }
    catch (error) {
      //抛出错误
      if (throwErrorFlag === true) {
        throw new ItemError(ItemError.USER_ITEM_NOT_EXIST);
      }
      //返回
      else {
        return false;
      }
    }
    finally {
      //结束执行
      logger.debug(`=====结束执行${identifier}=====`);
    }
  }


  /**
   * @description 获取模型By唯一键
   * 
   * @static
   * 
   * @param {Object} param1
   * @param {Number} param1.userId 用户ID
   * @param {Number} param1.itemId 物品ID
   * @param {Object} param2
   * @param {Boolean} [param2.checkModelFlag = true] 检查模型标志
   * @param {Boolean} [param2.throwErrorFlag = true] 抛出错误标志
   * @param {Object} param2.ctx 上下文
   * 
   * @returns {ItemUserModel}
   */
  static getModelByUniqueKey(
    {
      userId,
      itemId
    },
    {
      checkModelFlag = true,
      throwErrorFlag = true,
      ctx
    }
  ) {
    const identifier = 'DmmItemUserController::getModelByUniqueKey';
    
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
      logger?.debug('userId:', userId);
      DobUtilApi.checkValue(
        {
          value: userId
        },
        {
          type: DmmBaseConstant.PROP_ID_TYPE,
          rule: {
            ...DmmBaseConstant.PROP_ID_RULE
          }
        }
      );

      logger?.debug('itemId:', itemId);
      DobUtilApi.checkValue(
        {
          value: itemId
        },
        {
          type: DmmBaseConstant.PROP_ID_TYPE,
          rule: {
            ...DmmBaseConstant.PROP_ID_RULE
          }
        }
      );

      //获取模型
      let itemUserList = this.getModelListFromCache(
        {
          filterHandler: (itemUser) => {
            return itemUser.userId === userId && itemUser.itemId === itemId;
          }
        },
        {
          ctx
        }
      );

      let itemUser = itemUserList.length > 0 ? itemUserList[0] : null;

      //检查模型
      if (checkModelFlag === true) {
        this.checkModel(
          {
            model: itemUser
          },
          {
            throwErrorFlag,
            ctx
          }
        );
      }

      //返回
      return itemUser;
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


  /**
   * @description 创建
   * 
   * @static
   * 
   * @async
   * 
   * @param {Object} param1
   * @param {Number} param1.userId 用户ID
   * @param {Number} param1.itemId 物品ID
   * @param {Number} param1.count 数量
   * @param {Object} param2
   * @param {Boolean} [param2.useCacheFlag] 使用缓存标志
   * @param {Boolean} [param2.throwErrorFlag = true] 抛出错误标志
   * @param {Object} param2.ctx 上下文
   * 
   * @returns {Promise<PayOrderModel>}
   */
  static async create(
    {
      userId,
      itemId,
      count
    },
    {
      useCacheFlag,
      throwErrorFlag = true,
      ctx
    }
  ) {
    const identifier = 'DmmItemUserController::create';

    //获取日志器
    const logger = DobLogApi.getLogger(
      {
        category: identifier
      }
    );

    //开始执行
    logger.debug(`=====开始执行${identifier}=====`);

    try {
      //获取事务
      const transaction = ctx.state?.transaction;

      //处理参数
      if (useCacheFlag === undefined) {
        useCacheFlag = ctx.state?.useCacheFlag !== undefined ? ctx.state.useCacheFlag : true;
      }

      //检查参数
      logger.debug('userId:', userId);
      DobUtilApi.checkValue(
        {
          value: userId
        },
        {
          type: DmmBaseConstant.PROP_ID_TYPE,
          rule: {
            ...DmmBaseConstant.PROP_ID_RULE
          }
        }
      );

      logger.debug('itemId:', itemId);
      DobUtilApi.checkValue(
        {
          value: itemId
        },
        {
          type: DmmBaseConstant.PROP_ID_TYPE,
          rule: {
            ...DmmBaseConstant.PROP_ID_RULE
          }
        }
      );

      logger.debug('count:', count);
      DobUtilApi.checkValue(
        {
          value: count
        },
        {
          type: ItemConstant.PROP_USER_COUNT_TYPE,
          rule: {
            ...ItemConstant.PROP_USER_COUNT_RULE
          }
        }
      );

      logger.debug('useCacheFlag:', useCacheFlag);
      DobUtilApi.checkValue(
        {
          value: useCacheFlag
        },
        {
          type: DobUtilConstant.VALUE_TYPE_BOOLEAN,
        }
      );

      logger.debug('throwErrorFlag:', throwErrorFlag);
      DobUtilApi.checkValue(
        {
          value: throwErrorFlag
        },
        {
          type: DobUtilConstant.VALUE_TYPE_BOOLEAN,
        }
      );

      //创建
      let itemUser = await ItemUserModel.create(
        {
          userId,
          itemId,
          count
        },
        {
          transaction
        }
      );

      //添加到缓存
      if (useCacheFlag === true) {
        this.addModelToCache(
          {
            model: itemUser
          },
          {
            ctx
          }
        );
      }

      //返回
      return itemUser;
    }
    catch (error) {
      //抛出错误
      if (throwErrorFlag === true) {
        throw error;
      }
      //返回
      else {
        return null;
      }
    }
    finally {
      //结束执行
      logger.debug(`=====结束执行${identifier}=====`);
    }
  }


  /**
   * @description 更新
   * 
   * @static
   * 
   * @async
   * 
   * @param {Object} param1
   * @param {ItemUserModel} param1.itemUser 物品用户
   * @param {Object} param2
   * @param {Number} [param2.count] 数量
   * @param {Object} param3
   * @param {Boolean} [param3.autoSaveFlag] 自动保存标志
   * @param {Boolean} [param3.throwErrorFlag = true] 抛出错误标志
   * @param {Object} param3.ctx 上下文
   * 
   * @returns {Promise<Boolean>}
   */
  static async update(
    {
      itemUser
    },
    {
      count
    },
    {
      autoSaveFlag,
      throwErrorFlag = true,
      ctx
    }
  ) {
    const identifier = 'DmmItemUserController::update';

    //获取日志器
    const logger = DobLogApi.getLogger(
      {
        category: identifier
      }
    );

    //开始执行
    logger.debug(`=====开始执行${identifier}=====`);

    try {
      //获取事务
      const transaction = ctx.state?.transaction;

      //处理参数
      if (autoSaveFlag === undefined) {
        autoSaveFlag = ctx.state?.autoSaveFlag !== undefined ? ctx.state.autoSaveFlag : true;
      }

      //检查参数
      this.checkModel(
        {
          model: itemUser
        },
        {
          ctx
        }
      );

      logger.debug('count:', count);
      DobUtilApi.checkValue(
        {
          value: count
        },
        {
          type: ItemConstant.PROP_USER_COUNT_TYPE,
          rule: {
            ...ItemConstant.PROP_USER_COUNT_RULE,
            allowUndefined: true
          }
        }
      );

      //更新
      if (count !== undefined) {
        itemUser.count = count;
      }

      //保存
      if (autoSaveFlag === true) {
        await payOrder.save(
          {
            transaction
          }
        );
      }

      //返回
      return true;
    }
    catch (error) {
      //抛出错误
      if (throwErrorFlag === true) {
        throw error;
      }
      //返回
      else {
        return false;
      }
    }
    finally {
      //结束执行
      logger.debug(`=====结束执行${identifier}=====`);
    }
  }


  /**
   * @description 删除
   * 
   * @static
   * 
   * @async
   * 
   * @param {Object} param1
   * @param {ItemUserModel} param1.itemUser 物品用户
   * @param {Object} param2
   * @param {Boolean} [param2.useCacheFlag] 使用缓存标志
   * @param {Boolean} [param2.throwErrorFlag = true] 抛出错误标志
   * @param {Object} param2.ctx 上下文
   * 
   * @returns {Promise<Boolean>}
   */
  static async delete(
    {
      ItemUserModel
    },
    {
      useCacheFlag,
      throwErrorFlag = true,
      ctx
    }
  ) {
    const identifier = 'DmmItemUserController::delete';

    //获取日志器
    const logger = DobLogApi.getLogger(
      {
        category: identifier
      }
    );

    //开始执行
    logger.debug(`=====开始执行${identifier}=====`);

    try {
      //获取事务
      const transaction = ctx.state?.transaction;

      //处理参数
      if (useCacheFlag === undefined) {
        useCacheFlag = ctx.state?.useCacheFlag !== undefined ? ctx.state.useCacheFlag : true;
      }

      //检查参数
      this.checkModel(
        {
          model: ItemUserModel
        },
        {
          ctx
        }
      );

      logger.debug('useCacheFlag:', useCacheFlag);
      DobUtilApi.checkValue(
        {
          value: useCacheFlag
        },
        {
          type: DobUtilConstant.VALUE_TYPE_BOOLEAN,
        }
      );

      logger.debug('throwErrorFlag:', throwErrorFlag);
      DobUtilApi.checkValue(
        {
          value: throwErrorFlag
        },
        {
          type: DobUtilConstant.VALUE_TYPE_BOOLEAN,
        }
      );

      //从缓存中删除
      if (useCacheFlag === true) {
        this.deleteModelFromCache(
          {
            model: ItemUserModel
          },
          {
            ctx
          }
        );
      }

      //删除
      await ItemUserModel.destroy(
        {
          transaction
        }
      );

      //返回
      return true;
    }
    catch (error) {
      //抛出错误
      if (throwErrorFlag === true) {
        throw error;
      }
      //返回
      else {
        return false;
      }
    }
    finally {
      //结束执行
      logger.debug(`=====结束执行${identifier}=====`)
    }
  }
}

module.exports = ItemUserController;