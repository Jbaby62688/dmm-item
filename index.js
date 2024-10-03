const DmmItemConstant = require('./lib/constant/itemConstant');
const DmmItemError = require('./lib/error/itemError');
const DmmItemConfig = require('./lib/config/itemConfig');
const DmmItemUserModel = require('./lib/model/itemUserModel');
const DmmItemUserController = require('./lib/controller/itemUserController');
const DmmItemApi = require('./lib/api/itemApi');

function config(options) {
  DmmItemConfig.dbClient = options.dbClient;
}

function init() {
  DmmItemUserModel.init();
}

function afterInit() {

}

module.exports = {
  config,
  init,
  afterInit,
  DmmItemConstant,
  DmmItemError,
  DmmItemConfig,
  DmmItemUserModel,
  DmmItemUserController,
  DmmItemApi
}