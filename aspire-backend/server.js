const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const seedRoles = require("./app/seeders");

var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// DB connection
const db = require("./app/models");

// db.sequelize.sync();
// seedRoles();
db.sequelize.sync({force: true}).then( async () => {
  await seedRoles();
  console.log('Resync Database { force: true }');
});

app.get("/", (req, res) => {
  res.json({ message: "Express API is Ready" });
});

// routes

app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/loan.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


