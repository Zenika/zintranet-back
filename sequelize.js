const Sequelize = require('sequelize');
const UsersModel = require('./src/models/users');
const PromotionsModel = require('./src/models/promotions');
const ProgramsModel = require('./src/models/programs');
const RssFeedsModel = require('./src/models/rssfeeds');

const sequelize = new Sequelize(process.env.MYSQL_ADDON_DB, process.env.MYSQL_ADDON_USER, process.env.MYSQL_ADDON_PASSWORD, {
  host: process.env.MYSQL_ADDON_HOST,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const Users = UsersModel(sequelize, Sequelize);
const Promotions = PromotionsModel(sequelize, Sequelize);
const Programs = ProgramsModel(sequelize, Sequelize);
const RssFeeds = RssFeedsModel(sequelize, Sequelize);

sequelize.sync({ force: true })
  .then(() => {
    console.log('Database & tables created!');
  });

module.exports = {
  Users,
  Promotions,
  Programs,
  RssFeeds,
};
