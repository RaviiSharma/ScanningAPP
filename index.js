
const express = require("express");
const bodyParser = require('body-parser')
const upload = require("express-fileupload");

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true }))
app.use(upload());

const axios=require('axios')

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
  ValidPassword,validDigit,validDate,validDateTime,validIFSC,validCharNum,validAadhar,ValidPasswordAlfaNumeric} = require('../validations');



  app.post('/register', async (req, res) => {
    try {
      const data = req.body;
  
      console.log("data ",data);
  

      if (!data.Phone || !validInputValue(data.Phone) || !validPhone(data.Phone)){throw new Error('Invalid Phone')};

      if (!data.Password || !validInputValue(data.Password) || !ValidPasswordAlfaNumeric(data.Password)){throw new Error('Invalid Password')};
      if (!data.Confirm_Passowrd || !validInputValue(data.Confirm_Passowrd) || !ValidPasswordAlfaNumeric(data.Confirm_Passowrd)){throw new Error('Invalid Confirm_Passowrd')};

     if(data.Password !==data.Confirm_Passowrd){return res.json({code:"400",status:"failed",res:"password does not matched"})}

   // password encryption
  

  
      const UData = {
       
        Phone: data.Phone,
        Password:data.Password,

  
      };
  
     // console.log("UData", UData);
  
      await db("user_data1")
        .insert(UData)
        .then(() => {
          return res.status(201).json({
            data: {
              code:"201",
              message: "Registered successfully",data:UData,
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



  app.post('/profile', async (req, res) => {
    try {
      const data = req.body;
  
      //console.log("data ", data.Pincode);
  
      if (!data.Name || !validInputValue(data.Name) || !validOnlyCharacters(data.Name)){ throw new Error('Invalid Name');};
  
      if (!data.Email || !validInputValue(data.Email) || !validEmail(data.Email)){throw new Error('Invalid Email')};

      if (!data.Phone || !validInputValue(data.Phone) || !validPhone(data.Phone)){throw new Error('Invalid Phone')};

      if (!data.Password || !validInputValue(data.Password) || !ValidPasswordAlfaNumeric(data.Password)){throw new Error('Invalid Password')};

      if (!data.Aadhar || !validInputValue(data.Aadhar) || !validAadhar(data.Aadhar)){throw new Error('Invalid Aadhar')};
  
      if (!data.Pincode || !validInputValue(data.Pincode) || !validPincode(data.Pincode)){throw new Error('Invalid Pincode')};
  
      if (!data.Locality || !validInputValue(data.Locality)){throw new Error('Invalid Locality')};

      let x= await db('user_data1').select('Password').where('phone',data.Phone)

     // console.log("x",x[0].Password)

      if(x.length==0){return res.json({code:"404",status:"failed",res:"Account not register , please create account"})};
      if(data.Password !==x[0].Password){return res.json({code:"400",status:"failed",res:"password does not matched"})}


      //Matching pincode and city by axios call

      const options = {
        method: "GET",
        url: `https://api.postalpincode.in/pincode/${data.Pincode}`,
    };

    const pincodeDetail = await axios(options);

    if(pincodeDetail.data[0].PostOffice === null){return res.json({code:"404",status:"failed",res:"pin code should be valid "})};

    // console.log("pincodeDetail",pincodeDetail.data[0].PostOffice)

    // console.log("pincodeDetail",pincodeDetail.data[0].PostOffice[0].District)

            const cityNameByPinCode = pincodeDetail.data[0].PostOffice[0].District;
            const cityNameByPinCode1 = pincodeDetail.data[0].PostOffice[0].Region;
            const cityNameByPinCode2 = pincodeDetail.data[0].PostOffice[0].State;

            data.Locality = cityNameByPinCode+','+cityNameByPinCode1+','+cityNameByPinCode2
            console.log(" data.Locality", data.Locality)
      

  
      const UData = {
        Name: data.Name,
        Email: data.Email,
        Password:data.Password,
        Phone: data.Phone,
        Aadhar: data.Aadhar,
        Pincode: data.Pincode,
        Locality: data.Locality
      };
  
     // console.log("UData", UData);
  
      await db("user_data")
        .insert(UData)
        .then(() => {
          return res.status(201).json({
            data: {
              code:"201",
              message: "Registered successfully",data:UData,
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

//login
  app.post('/login', async (req, res) => {
    try {
      const data = req.body;
  
     console.log("v",typeof(Number(data.Phone)));
  
      if (!data.Phone || !validInputValue(data.Phone) || !validPhone(data.Phone)){throw new Error('Invalid Phone')};
      if (!data.Password || !validInputValue(data.Password) || !ValidPasswordAlfaNumeric(data.Password)){throw new Error('Invalid Password')};


      let x= await db('user_data').select('Password','Phone','Name').where('Password',data.Password)

      if(x.length==0){return res.json({code:"404",status:"failed",res:"Account not register , please create account"})};

     // console.log("v1",typeof(x[0].Phone));

      console.log("x",x[0])
      console.log("xPhone",x[0].Phone)
      let a=toString(data.Phone)
      let b=toString(x[0].Phone)

      console.log(a == b) 




      
      if(data.Password !==x[0].Password){return res.json({code:"400",status:"failed",res:"incorrect password"})}
      else if(a != b){return res.json({code:"400",status:"failed",res:"incorrect Phone1"})}

      return res.status(200).json({
        data: {
          code:"200",
          message: "Login successfully"
        },
      });


    } catch (error) {
      console.log(error)
      return res.status(500).json({ code: "500", status: "error", message: "Something went wrong: " + error, data: {} });
    }
  });
  

  app.post('/ForgetPassword', async (req, res) => {
    try {
      const data = req.body;
  
      console.log("v",data);
  
      if (!data.Phone || !validInputValue(data.Phone) || !validPhone(data.Phone)){throw new Error('Invalid Phone')};


      let x= await db('user_data').select('Password','Phone','Name').where('Phone',data.Phone)

      console.log("x",x[0])
    

      if(x.length==0){return res.json({code:"404",status:"failed",res:"Phone number not exist"})};


      function generateRandomPassword() {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$*';
        const passwordLength = Math.floor(Math.random() * 7) + 6; // Generate a random length between 6 and 12
        let password = '';
        for (let i = 0; i < passwordLength; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          password += characters.charAt(randomIndex);
        }
        return password;
      }
      
      // Generate a random password
      const randomPassword = generateRandomPassword();
      console.log(randomPassword);
      
      await db('user_data1')
      .where('Phone', data.Phone)
      .update({ Password: randomPassword });

      await db('user_data')
      .where('Phone', data.Phone)
      .update({ Password: randomPassword });
    
    

      return res.status(200).json({
        data: {
          code:"200",
          message: "new password",password:randomPassword
        },
      });


    } catch (error) {
      console.log(error)
      return res.status(500).json({ code: "500", status: "error", message: "Something went wrong: " + error, data: {} });
    }
  });



  //update 

  app.put("/updateProfile/:Id", async function (req, res) {
    try {
      var data = req.body;
      console.log("data",data)
      
 
      let store={};

      const userId = req.params.Id;
      console.log("c",userId)

      if (!userId) {
        return res
          .status(400)
          .send({ status: false, msg: "userId is mandatory" });
      }
      console.log("0",data.Name)

      if (data.Name){
      // if (!validOnlyCharacters(data.Name));
        store["Name"] = Name;
        }

        console.log("0",data.Name)
      console.log("x")


      //   if(data.Email){
      //   if (!data.Email || !validInputValue(data.Email) || !validEmail(data.Email));;
      //   store["Email"] = data.Email;
      // }


      console.log("1")
  
      // if(data.Phone){
      //   if (!data.Phone || !validInputValue(data.Phone) || !validPhone(data.Phone));
      //   store["Phone"] = data.Phone;
      // }
      // console.log("2")


      // if(data.Password){
      //   if (!data.Password || !validInputValue(data.Password) || !ValidPasswordAlfaNumeric(data.Password));
      //   store["Password"] = data.Password;
      // }
      // console.log("3")

      // if(data.Aadhar){
      //   if (!data.Aadhar || !validInputValue(data.Aadhar) || !validAadhar(data.Aadhar));
      //   store["Aadhar"] = data.Aadhar;
      // }
      // console.log("4")

      // if(data.Pincode){
      //   if (!data.Pincode || !validInputValue(data.Pincode) || !validPincode(data.Pincode));
      //   store["Pincode"] = data.Pincode;
      // }
      // console.log("x")

      // if(data.Locality){
      //   if (!data.Locality || !validInputValue(data.Locality));
      //   store["Locality"] = data.Locality;
      // }

      
       store={
Name:data.Name
      }
    console.log("store",store)

            //update in sql table
            await db("user_data")
              .where("Id", userId)
              .update(store);
            return res
              .status(200)
              .send({
                code: "200",
                status: "success",
                msg: "successfully!",
                result: store,
              });
          
        } 

    catch (err) {
      return res
        .status(500)
        .send({ code: "500", status: "failed", error: "server error" });
    }
  });
  //-----------------------------------------------------------------

//   const authentication = function (req, res, next) {
//     try {
//         let token = req.headers['x-api-key']

//         if (!token) {
//             return res.status(401).send({ status: false, message: "neccessary header token is missing" })
//         }
        
//         jwt.verify(token, "Project-1", (err, Decoded)=> {
//             if(err){ return res.status(403).send("failed authentication")}
          
//             // console.log(Decoded)
//            req.user=Decoded

//         })
//         next()
         
//     }catch (err) {
//         return res.status(500).send({ status: false, message: err.message })
//     }
// }
//module.exports.authentication = authentication

// login User
// app.post("/loginUser", async function (req, res) {
//   try {
//     let employee_name = req.body.employee_name;
//     let employee_no = req.body.employee_no;


//     console.log("user_employee_no-",employee_no)

//      if (!employee_name ||!isValidInputValue(employee_name) ||!isValidOnlyCharacters(employee_name))
//     {return res.status(400).send({status: false,message:"employee_name is required and should contain only alphabets",});};
      
//     if (!employee_no ||!isValidInputValue(employee_no) ||!(employee_no).match(/^[a-zA-Z0-9]+$/))
//     {return res.status(400).send({status: false,message:"employee_id is required but only matches a string containing only alphabets and numbers",});};


//     //matching employee_id from db
//     const correctEmp = await db.select("*").from("ptr_employees").where("employee_no",employee_no);

//     if(correctEmp.length ==0){return res.send({status:false,message:"incorrect number, employee_no is not present"})}
//     //console.log("correctEmp",correctEmp)
//     console.log("employee_id",correctEmp[0].employee_id)
//     console.log("employee_type",correctEmp[0].employee_type)
//     console.log("employee_no",correctEmp[0].employee_no)

//     // token gen
//     let token = jwt.sign(
//       { 
//         employee_id: correctEmp[0].employee_id,
//         employee_type: correctEmp[0].employee_type,
//       },
//       "Project-1"
//     );
//     res.status(201).send({ status: true, data: token });
//   } catch (err) {
//     res.status(500).send({ message: "Error", error: err.message });
//   }
// });



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



