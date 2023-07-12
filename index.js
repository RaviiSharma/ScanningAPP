
const express = require("express");
const bodyParser = require('body-parser')
const upload = require("express-fileupload");

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true }))
app.use(upload());

const knex = require("knex");

//const mysql = require('mysql');

//for QR READER-----
// const QRCode = require('qrcode-reader');
// const fs = require('fs');
// const Jimp = require('jimp');


// Create a MySQL connection
// const con = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//  // password: 'password',
//   database: 'exceldb',
// });

// // Connect to the MySQL server
// con.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err);
//     return;
//   }
//   console.log('Connected to MySQL server');
// });

app.listen(3000, () => {console.log("mysql Server started at post 3000")});


//------------------ mysql connections using knex --------------------

const db = knex({
    client: "mysql",
    connection: {
      host: "localhost",
      user: "root",
      password: "", //password
      database: "exceldb",
    },
  });



// // ----------------------------------- validations here -------------------------------

const {validInputValue,validOnlyCharacters,validEmail,validPhone,validNumber,validPincode,validPrice,validObjectId,validImageType,
  ValidPassword,validDigit,validDate,validDateTime,validIFSC,validCharNum,validAadhar} = require('../validations');

  app.post('/register', async (req, res) => {
    try {
      const data = req.body;
  
      console.log("data ", data.Phone);
  
      if (!data.Name || !validInputValue(data.Name) || !validOnlyCharacters(data.Name)){ throw new Error('Invalid Name');};
  
      if (!data.Email || !validInputValue(data.Email) || !validEmail(data.Email)){throw new Error('Invalid Email')};
  
      if (!data.Phone || !validInputValue(data.Phone) || !validPhone(data.Phone)){throw new Error('Invalid Phone')};
  
      if (!data.Aadhar || !validInputValue(data.Aadhar) || !validAadhar(data.Aadhar)){throw new Error('Invalid Aadhar')};
  
      if (!data.Pincode || !validInputValue(data.Pincode) || !validPincode(data.Pincode)){throw new Error('Invalid Pincode')};
  
      if (!data.Locality || !validInputValue(data.Locality)){throw new Error('Invalid Locality')};
  
      const UData = {
        Name: data.Name,
        Email: data.Email,
        Phone: data.Phone,
        Aadhar: data.Aadhar,
        Pincode: data.Pincode,
        Locality: data.Locality
      };
  
      console.log("UData", UData);
  
      await db("user_data")
        .insert(UData)
        .then(() => {
          return res.status(201).json({
            data: {
              code:"201",
              message: "Registered successfully",
            },
          });
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      return res.status(500).json({ code: "500", status: "error", message: "Something went wrong: " + error, data: {} });
    }
  });
  
  




// Read and decode QR code image
// const readQRCode = (imagePath) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(imagePath, (err, fileData) => {
//       if (err) {
//         reject(err);
//         return;
//       }

//       Jimp.read(fileData, (err, image) => {
//         if (err) {
//           reject(err);
//           return;
//         }

//         const qr = new QRCode();
//         qr.callback = (err, value) => {
//           if (err) {
//             reject(err);
//           } else {
//             resolve(value.result);
//           }
//         };
//         qr.decode(image.bitmap);
//       });
//     });
//   });
// };

// // Save QR code data to MySQL database
// const saveQRCodeData = (data) => {
//   const query = 'INSERT INTO users (qrcodes) VALUES (?)';
//   connection.query(query, [data], (err, results) => {
//     if (err) {
//       console.error('Error saving QR code data:', err);
//     } else {
//       console.log('QR code data saved successfully');
//     }
//   });
// };

// Main function
// app.post('/main', async (req,res) => {
//   try {
//     const imagePath = './bb/k.jpg';// Replace with the path to your QR code image
//     console.log("imagePath",imagePath)
     
//     const data = await readQRCode(imagePath);
//     console.log('QR Code Data:', data);
//     saveQRCodeData(data);
//   } catch (err) {
//     console.error('Error reading QR code:', err);
//   } finally {
//     connection.end(); // Close the MySQL connection
//   }
//   return res.json({code:"200",msg:"done"})
// });



