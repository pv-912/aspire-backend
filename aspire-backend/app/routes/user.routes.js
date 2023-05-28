const { authJwt } = require("../middleware");
const userController = require("../controllers/user.controller");
const loanController = require("../controllers/loan.controller");

module.exports = function(app) {

    // test API for middleware authorization testing
    app.get("/api/test/all", userController.allAccess);

    app.get(
        "/api/test/customer",
        [authJwt.verifyToken],
        userController.userBoard
    );

    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        userController.adminBoard
    );

    //add loan request by customer
    app.post(
        "/api/customer/addLoanRequest",
        [authJwt.verifyToken],
        userController.addLoanRequest
    );

    //fetch loan details by customer
    app.get(
        "/api/customer/fetchLoan",
        [authJwt.verifyToken],
        userController.fetchLoan
    );

    //repayment
    app.post(
        "/api/customer/repayment",
        [authJwt.verifyToken],
        userController.repayment
    );
};