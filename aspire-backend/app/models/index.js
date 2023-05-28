const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.loan = require("../models/loan.model.js")(sequelize, Sequelize);
db.transaction = require("../models/transaction.model.js")(sequelize, Sequelize);

// associations
// Role can have multiple user
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "contact"
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "contact",
    otherKey: "roleId"
  });

// Custoemr can have multiple loans
db.user.belongsToMany(db.loan, {
    through: "user_loans",
    foreignKey: "contact",
    otherKey: "loanId"
});

// Loan can have multiple payment transactions
db.loan.belongsToMany(db.transaction, {
    through: "loan_transaction",
    foreignKey: "loanId",
    otherKey: "transactionId,amount,termNo"
  });

db.ROLES = ["customer", "admin"];

module.exports = db;