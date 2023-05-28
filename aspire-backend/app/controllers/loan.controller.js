const db = require("../models");
const User = db.user;
const Loan = db.loan;
// const Role = db.role;

exports.approveLoan = (req, res) => {
    if(req.body && req.contact && req.body.loanId) {
        const id = req.body.loanId;
        Loan.findByPk(id).then(loan => {
            if(!loan) res.status(404).send({message: "Loan not found."});
            loan.update({loanStatus: 'APPROVED'}).then( loan_2 => {
                if(!loan_2) res.status(404).send({message: "Something went wrong!!"});
                res.send({message: "Loan Approved"});
            }).catch(err => res.status(400).send({message: "Something went wrong"}));
        }).catch(err => res.status(400).send({message: "Something went wrong"}));
    } else if(!req.body) {
        res.status(412).send({ message: "Loan amount is required!!" });
    } else if(!req.contact) {
        res.status(401).send({ message: "Unable to aunthenticate. Something went wrong!!" });
    } else if(!req.body.loanId) {
        res.status(401).send({ message: "Unable to aunthenticate. Something went wrong!!" });
    } 
};

// dummy template
exports.a = (req, res) => {
    if(req.body && req.contact) {
        
    } else if(!req.body) {
        res.status(412).send({ message: "Loan amount is required!!" });
    } else if(!req.contact) {
        res.status(401).send({ message: "Unable to aunthenticate. Something went wrong!!" });
    } 
};

