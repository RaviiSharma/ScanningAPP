var sql = require("mssql");

// var config = {
//   server: "150.242.14.33",
//   user: "sa",
//   password: "YES@123",
//   database: "LOYALTYMOBILE",
//   options: {
//     // encrypt:true,
//     trustServerCertificate: true,
//   },
// };

var config = {
  server: "localhost",
  user: "sa",
  password: "Ravi@036",
  database: "LOYALTYMOBILE1",
  // port: 3000,
  options: {
    trustServerCertificate: true,
  },
};
const db = sql.connect(config, function (err) {
  if (err) {
    console.log(err.message);
    return res.status(500).send("Error connecting to the database.");
  } else {
    console.log("ms sql connected");
  }
});

module.exports = db;
