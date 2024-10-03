const {
  DataTypes
} = require('@dob/db');
const {
  DmmBaseModel
} = require('@dmm/base');
const ItemConfig = require('../config/itemConfig');

class ItemUserModel extends DmmBaseModel {
  static init() {
    super.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        userId: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
          field: 'user_id'
        },
        itemId: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
          field: 'item_id'
        },
        count: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
          defaultValue: 0
        }
      },
      {
        sequelize: ItemConfig.dbClient,
        modelName: 'itemUser',
        tableName: 't_item_user',
        timestamps: false
      }
    )
  }
}

module.exports = ItemUserModel;