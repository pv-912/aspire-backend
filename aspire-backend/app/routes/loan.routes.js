const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = (app) => {

  // Get all loan details for a particular user  
  // Only accessible to admin
  app.get(
    "/api/loan/allLoan", 
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.allAccess);

};