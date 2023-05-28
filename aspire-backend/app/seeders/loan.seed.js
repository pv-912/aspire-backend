const db = require("../models");

const Loan = db.loan;
const User = db.user;

module.exports = async () => {
    await Loan.create({
      amount: 100,
      terms: 5
    }).then(loan => {
        User.findByPk('9919431221').then(user => {
            user.addLoans(loan).then( () => {
                console.log("Loan 1 added successfully");
            })
        }).catch(err => console.log("Error while adding user to seeded loan" + err));
    }).catch(err => console.log("Error while creating seeded Loan" + err));

    await Loan.create({
        amount: 10000,
        terms: 13
      }).then(loan => {
          User.findByPk('9919431221').then(user => {
              user.setLoans(loan).then( () => {
                  console.log("Loan 3 added successfully");
              })
          }).catch(err => console.log("Error while adding user to seeded loan" + err));
      }).catch(err => console.log("Error while creating seeded Loan" + err));

    await Loan.create({
      amount: 500,
      terms: 10
    }).then(loan => {
        User.findByPk('9919431222').then(user => {
            user.addLoans(loan).then( () => {
                console.log("Loan 2 added successfully");
            })
        }).catch(err => console.log("Error while adding user to seeded loan" + err));
    }).catch(err => console.log("Error while creating seeded Loan" + err));
}