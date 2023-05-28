const db = require("../models");

const Loan = db.loan;
const Transaction = db.transaction;

module.exports = async () => {
    await Loan.findByPk(2).then( loan => {
        if(loan.loanStatus == 'PENDING') {
            Transaction.create({
                amount:100,
                termNo:1,
                status: 'SUCCESSFUL',
                loanId: 2
            }).then( trans => {
                const amountPaid = loan.amountPaid + trans.amount;
                const termPaid = loan.termPaid + 1;
                loan.update(
                    {  
                        amountPaid: amountPaid,
                        termPaid: termPaid
                    },
                    {where: {id: 2}}
                ).then( loan2 => {
                    console.log("Transaction Successful");
                })
            })
        }
    })

    await Loan.findByPk(2).then( loan => {
        if(loan.loanStatus == 'PENDING') {
            Transaction.create({
                amount:1000,
                termNo:2,
                status: 'SUCCESSFUL',
                loanId: 2
            }).then( trans => {
                const amountPaid = loan.amountPaid + trans.amount;
                const termPaid = loan.termPaid + 1;
                loan.update(
                    {  
                        amountPaid: amountPaid,
                        termPaid: termPaid
                    },
                    {where: {id: 2}}
                ).then( loan2 => {
                    console.log("Transaction Successful");
                })
            })
        }
    })
}