const Sequelize = require("sequelize")
const sequelize = new Sequelize(
    'biodata_db',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

const db = {};
db.Sequelize = Sequelize; // properti untuk dependency
db.sequelize = sequelize;
db.book = require("./book.model.js")(sequelize, Sequelize);

module.exports = db;