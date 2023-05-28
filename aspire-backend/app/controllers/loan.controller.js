const db = require("../models");
const User = db.user;
const Loan = db.loan;
// const Role = db.role;

exports.approveLoan = (req, res) => {
    if(req.body && req.contact && req.body.loadId) {
        const id = req.body.loadId;

        Loan.findByPk(id).then(loan => {
            if(!loan) res.status(404).send({message: "Loan not found."});
            loan.update({status: 'APPROVED'}).then( loan_2 => {
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


exports.addLoanRequest = (req, res) => {
    if(req.body && req.contact && req.body.amount && req.body.terms) { // if mandatory fields are not sent with the body, throw 412
        const amount = req.body.amount;
        const terms = req.body.terms;
        const contact = req.contact;
        Loan.create({
            amount: amount,
            terms: terms
        }).then(loan => {
            User.findByPk(contact).then(user => {
                user.addLoans(loan).then( () => {
                    res.send({ message: "Loan request created successfully!! We will review your request and get back to you. Thanks!! "});
                })
            }).catch(err => res.status(500).send({message: "Error while raising loan request. Please retry." + err.message}));
        }).catch(err => res.status(500).send({message: "Error while raising loan request. Please retry." + err.message}));
    } else if(!req.body) {
        res.status(412).send({ message: "Loan amount is required!!" });
    } else if(!req.contact) {
        res.status(401).send({ message: "Unable to aunthenticate. Something went wrong!!" });
    } else if(!req.body.amount) {
        res.status(412).send({ message: "Loan amount is required!!" });
    } else if(!req.body.amount) {
        res.status(412).send({ message: "No. of loan terms is required!!" });
    }
    
}

exports.fetchLoan = (req, res) => {
    if(req.body && req.contact) {
        const contact = req.contact;

        User.findByPk(contact, {
            include: {
                model: Loan,
                through: {
                    attributes: []
                }      
            }
        }).then( user => {
            res.status(200).send({
                res: user
            })
        })

    } else if(!req.body) {
        res.status(412).send({ message: "Loan amount is required!!" });
    } else if(!req.contact) {
        res.status(401).send({ message: "Unable to aunthenticate. Something went wrong!!" });
    } 
};


exports.a = (req, res) => {
    if(req.body && req.contact) {
        
    } else if(!req.body) {
        res.status(412).send({ message: "Loan amount is required!!" });
    } else if(!req.contact) {
        res.status(401).send({ message: "Unable to aunthenticate. Something went wrong!!" });
    } 
};

