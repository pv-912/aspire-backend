const db = require("../models");
const User = db.user;
const Loan = db.loan;
const Transaction = db.transaction;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
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


exports.repayment = (req, res) => {
    if(req.body && req.contact && req.body.loanId && req.body.amount && req.body.status) {
        const loanId = req.body.loanId;
        const amount = req.body.amount;
        const status = req.body.status;
        const contact = req.contact;
        User.findByPk(contact, {
            include: {
                model: Loan,
                attributes: ['id']
            }
        }).then(user => {
            Loan.findByPk(loanId).then( loan => {
                const minAmount = loan.amount/loan.terms;
                // Loan should be in approved status
                // Payment Amount should be greater than minAmount
                if(loan && loan.loanStatus == 'APPROVED' ) {
                    
                    const termNo = loan.termPaid + 1;
                    const amountLeft = loan.amount - loan.amountPaid;  // for last installment amount should equal to amountleft
                    
                    if(termNo == loan.terms && amount != amountLeft) {
                        return res.status(400).send({ message: "For last installment amount should shoule be equal to left amount!!" });
                    } else if(amount <= amountLeft) {
                        return res.status(400).send({ message: "Amount paid is more than left loan amount!!" });
                    }

                    if( (termNo == loan.terms && amount == amountLeft) || (amount >= minAmount && amount <= amountLeft)) {
                        Transaction.create({
                            amount: amount,
                            termNo: termNo,
                            status: status,
                            loanId: loanId
                        }).then( trans => {
                            const amountPaid = loan.amountPaid + trans.amount;
                            const status = termNo == loan.terms ? 'PAID' : 'APPROVED';
                            loan.update(
                                {  
                                    amountPaid: amountPaid,
                                    termPaid: termNo,
                                    loanStatus: status
                                },
                                {where: {id: loanId}}
                            ).then( loan2 => {
                                if(!loan2 ) {
                                    return res.status(400).send({ message: "Somethign went wrong -1!!" });
                                }
                                const msg = termNo == loan.terms ? "Payment Successful for last installment. Please fell free to contact us again for any loan requirement." :"Payment Successful for weekly installment term " + termNo + " !!";
                                return res.send({  
                                    amount: amount,
                                    message: msg
                                })
                            }).catch(err => res.status(400).send({message: "Something went wrong 0!!"}));
                        }).catch(err => res.status(400).send({message: "Something went wrong 1!!"}));
                    } else {
                        return res.status(406).send({message: "Amount to be paid is less than minimum installment !!"});
                    }
                } else if(loan.loanStatus == 'PAID') {
                    return res.status(406).send({ message: "Loan is already fully paid. Payment will be reverted to your bank in next 7 days!!" });
                } else if(loan.loanStatus == 'REJECTED') {
                    return res.status(406).send({ message: "Your loan request is rejected. Payment will be reverted to your bank in next 7 days!!" });
                } else {
                    return res.status(406).send({ message: "Repayment amount should not be less than min repayment amount!!" });
                }
            }).catch(err => res.status(400).send({message: "Something went wrong 2!!" + err}))
        }).catch(err => res.status(400).send({message: "Something went wrong 3!!"}))
        
        
    } else if(!req.body) {
        return res.status(412).send({ message: "Loan amount is required!!" });
    } else if(!req.contact) {
        return res.status(401).send({ message: "Unable to aunthenticate. Something went wrong!!" });
    } else {
        return res.status(401).send({ message: "Insufficient Data!!" });
    }
};