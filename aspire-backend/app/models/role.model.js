module.exports = (sequelize, Sequelize) => {
    
    // 2 seeded Roles: "customer", "admin"
    const Role = sequelize.define("roles", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      }
    });
  
    return Role;
};