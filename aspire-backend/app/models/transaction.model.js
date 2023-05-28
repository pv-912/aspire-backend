module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("trasanctions", {
        amount: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        loanId: {
            type: Sequelize.INTEGER,
            primaryKey: true   
        },
        termNo: {                    // no of term payments
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true   
        },
        status: {                   // payment status
            type: Sequelize.ENUM('SUCCESSFUL', 'PENDING', 'REJECTED'),
            defaultValue : 'PENDING'
        }
    }, 
    {
        defaultScope :{
            attributes: {
                // exclude the unwanted columns password on .find call
                exclude: ['createdAt', 'updatedAt', 'deletedAt'] 
            }
    }});
    return Transaction;
};