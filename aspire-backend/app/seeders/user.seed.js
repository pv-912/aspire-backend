const db = require("../models");

const User = db.user;
const Role = db.role;
const bcrypt = require("bcryptjs");

module.exports = async () => {
    // Seed Admin
    await User.create({
        name: "Admin",
        contact: "8888888888",
        email: "admin@gmail.com",
        address: "Admin Address 1",
        password: bcrypt.hashSync("adminPassword", 8)
    }).then(user => {
        Role.findAll({ where: { name: "admin" }}).then(roles => {
            user.setRoles(roles).then(() => {
                console.log( "User with role admin registered successfully!" );
            });
        });
    });

    //Seed User
    await User.create({
        name: "Prashant 1",
        contact: "9919431221",
        email: "prashant1@gmail.com",
        address: "User Address 1",
        password: bcrypt.hashSync("password", 8)
    }).then(user => {
        Role.findAll({ where: { name: "customer" }}).then(roles => {
            user.setRoles(roles).then(() => {
                console.log( "User with role customer registered successfully!" );
            });
        });
    });

    await User.create({
        name: "Prashant 2",
        contact: "9919431222",
        email: "prashant2@gmail.com",
        address: "User Address 2",
        password: bcrypt.hashSync("password", 8)
    }).then(user => {
        Role.findAll({ where: { name: "customer" }}).then(roles => {
            user.setRoles(roles).then(() => {
                console.log( "User with role customer registered successfully!" );
            });
        });
    });

    await User.create({
        name: "Prashant 3",
        contact: "9919431223",
        email: "prashant3@gmail.com",
        address: "User Address 3",
        password: bcrypt.hashSync("password", 8)
    }).then(user => {
        Role.findAll({ where: { name: "customer" }}).then(roles => {
            user.setRoles(roles).then(() => {
                console.log( "User with role customer registered successfully!" );
            });
        });
    });
}