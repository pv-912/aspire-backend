const seedRole = require("./role.seed");
const seedUser = require("./user.seed");
const seedLoan = require("./loan.seed");
const seedTransaction = require("./transaction.seed");

module.exports = async () => {
  await seedRole();
  await seedUser();
  await seedLoan();
  await seedTransaction();
};