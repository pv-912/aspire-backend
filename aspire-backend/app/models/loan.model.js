module.exports = (sequelize, Sequelize) => {
    const Loan = sequelize.define("loans", {
        amount: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        terms: {                    // no of weekly recurring payments
            type: Sequelize.INTEGER,
            allowNull: false   
        },
        loanStatus: {
            type: Sequelize.ENUM('APPROVED', 'PENDING', 'REJECTED', 'PAID'),
            defaultValue : 'PENDING'
        },
        amountPaid: {               // total amount paid yet
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        termPaid: {               // total amount paid yet
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        // Payment date should start after loan is approved.
        approvalDate: {            
            type: Sequelize.DATE
        }
    }, 
    {
        defaultScope :{
            attributes: {
                // exclude the unwanted columns password on User.find call
                exclude: ['createdAt', 'updatedAt', 'deletedAt'] 
            }
    }});
    return Loan;
};