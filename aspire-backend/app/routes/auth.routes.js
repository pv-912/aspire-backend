const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  
    // signup API
    /* payload:
    {
        "name": "",
        "email":"",
        "contact":"",
        "address":"",
        "password": ""
    }
    */
    app.post(
        "/api/auth/signup",
        [
        verifySignUp.checkDuplicateContactOrEmail,
        verifySignUp.checkRolesExisted
        ],
        controller.signup
    );

    // signin API
    /* payload
    {
        "contact":"",
        "password": ""
    }
    */
    app.post("/api/auth/signin", controller.signin);
};