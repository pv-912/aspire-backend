module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        contact: {                  // Primary Key
            type: Sequelize.STRING,
            primaryKey: true
        },
        address: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
        // We can add more customer info like PAN, DOB details as required
    });
    return User;
};