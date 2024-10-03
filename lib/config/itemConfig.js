const {
  DobLogApi
} = require('@dob/log');
const {
  DmmBaseConfig
} = require('@dmm/base');

const logger = DobLogApi.getLogger(
  {
    category: 'DmmItemConfig'
  }
);

class ItemConfig extends DmmBaseConfig {
}

module.exports = ItemConfig;