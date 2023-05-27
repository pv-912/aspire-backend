const db = require("../models");

const Role = db.role;

module.exports = async () => {
    await Role.create({
      id: 1,
      name: "customer"
    });
    await Role.create({
      id: 2,
      name: "admin"
    });
}