const { authJwt } = require("../middleware");
const userController = require("../controllers/user.controller");
const loanController = require("../controllers/loan.controller");

module.exports = (app) => {

  // Get all loan details for a particular user  
  // Only accessible to admin
  app.get(
    "/api/loan/allLoan", 
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.allAccess);

    app.post(
        "/api/loan/approveLoan", 
        [authJwt.verifyToken],
        loanController.approveLoan, authJwt.isAdmin
        );

};