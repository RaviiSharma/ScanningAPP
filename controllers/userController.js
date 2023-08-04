// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");

//ms sql connection
var sql = require("mssql");
var db = require("../dbConfig");

let emailfunction =require('../controllers/sendMail');

let request = db.request();

let moment = require('moment');
let date = moment();
 let formattedDate = date.format('YYYY-MM-DD HH:mm:ss');

//console.log("formattedDate", formattedDate);

// ----------------------------------- validations here -------------------------------

const {
  validInputValue,
  validOnlyCharacters,
  validEmail,
  validPhone,
  validNumber,
  validPincode,
  validPrice,
  validObjectId,
  validImageType,
  ValidPassword,
  validDigit,
  validDate,
  validDateTime,
  validIFSC,
  validCharNum,
  validAadhaar,
  ValidPasswordAlfaNumeric,
  isValidURL,
} = require("../utilities/validator");

// //details from token
// const getProfileDetails = async (req, res) => {
//   try {
//     console.log("getProfileDetails API");

//     const user = req.user; //decoded token
//     let userID = user.id;
//     console.log("from token userID", userID);

//     const result = await request.query(
//       `select * from dbo.USERLOGIN where ID = ${userID}`
//     );

//     if (result.recordset.length === 0) {
//       return res.json({
//         code: "400",
//         status: "failed",
//         message: "no data found",
//       });
//     }

//     let obj = {
//       ID: result.recordset[0].ID,
//       NAME: result.recordset[0].NAME,
//       EMAILID: result.recordset[0].EMAILID,
//       MOBILENO: result.recordset[0].MOBILENO,
//       ADHAARNO: result.recordset[0].ADHAARNO,
//       PINCODE: result.recordset[0].PINCODE,
//       ADDRESS: result.recordset[0].ADDRESS,
//       CITY: result.recordset[0].CITY,
//       DISTRICT: result.recordset[0].DISTRICT,
//       STATES: result.recordset[0].STATES,
//     };
//     console.log("m", obj);
//     let arr = [];
//     arr.push(obj);
//     res.json({ code: "200", message: "userDetails", data: arr });
//   } catch (error) {
//     return res.status(500).json({
//       code: "500",
//       status: "error",
//       message: "Something went wrong: " + error.message,
//     });
//   }
// };

// // CREATE PROFILE 
// const createProfile = async (req, res) => {
//   let request = db.request();
//   try {

//     console.log("createProfile API");

//     const data = req.body;
//     console.log("body", data);

    
//     if (
//       !data.Name ||
//       !validInputValue(data.Name) ||
//       !validOnlyCharacters(data.Name)
//     ) {
//       throw new Error("Invalid Name");
//     }
//     console.log("data.Name", data.Name);

//     if (
//       !data.Email ||
//       !validInputValue(data.Email) ||
//       !validEmail(data.Email)
//     ) {
//       throw new Error("Invalid Email");
//     };

//     // const result1= await request.query(
//     //   `SELECT EMAILID FROM dbo.USERLOGIN WHERE EMAILID = ${data.Email}`
//     // );

//     // if (result1.recordset.length) {
//     //   return res.json({
//     //     code: "400",
//     //     status: "failed",
//     //     message: "Email already exists, please enter unique Email ",
//     //   });
//     // };

//     if (
//       !data.Phone  ||
//       !validInputValue(data.Phone) ||
//       !validPhone(data.Phone)
//     ) {
//       throw new Error("Invalid Phone");
//     }

//     let phone = data.Phone;
//     const result0 = await request.query(
//       `SELECT MOBILENO FROM dbo.USERLOGIN WHERE MOBILENO = ${phone}`
//     );
//     console.log("result0", result0);
//     if (result0.recordset.length) {
//       return res.json({
//         code: "400",
//         status: "failed",
//         message: "MOBILENO already exists, please enter unique MOBILENO ",
//       });
//     }

//     if (
//       !data.Aadhaar  ||
//       !validInputValue(data.Aadhaar) ||
//       !validAadhaar(data.Aadhaar)
//     ) {
//       throw new Error("Invalid Aadhaar");
//     }

//     if (
//       !data.Pincode ||
//       !validInputValue(data.Pincode) ||
//       !validPincode(data.Pincode)
//     ) {
//       throw new Error("Invalid Pincode");
//     }

//     if (!data.address || !validInputValue(data.address)) {
//       throw new Error("Invalid address");
//     }

//     //Matching pincode and city by axios call
//     const options = {
//       method: "GET",
//       url: `https://api.postalpincode.in/pincode/${data.Pincode}`,
//     };

//     const pincodeDetail = await axios(options);

//     if (pincodeDetail.data[0].PostOffice === null) {
//       return res.json({
//         code: "400",
//         status: "failed",
//         message: "pin code should be valid ",
//       });
//     }

//     const cityNameByPinCode1 = pincodeDetail.data[0].PostOffice[0].Division;
//     const cityNameByPinCode = pincodeDetail.data[0].PostOffice[0].District;
//     const cityNameByPinCode2 = pincodeDetail.data[0].PostOffice[0].State;

//     let moment = require('moment');
//     let date = moment();
//     let formattedDate = date.format('YYYY-MM-DD HH:mm:ss');
    
//     console.log("formattedDate", formattedDate);

//     let UData = {
//       NAME: data.Name,
//       EMAILID: data.Email,
//       MOBILENO: data.Phone,
//       ADHAARNO: data.Aadhaar,
//       PINCODE: data.Pincode,
//       CITY: cityNameByPinCode1,
//       DISTRICT: cityNameByPinCode,
//       STATES: cityNameByPinCode2,
//       ADDRESS: data.address,
//       STATUS:'ACTIVE'
//     };

//     console.log("d", UData);
//    // let request = db.request();

//     request
//       .input("REGDATE", sql.DateTime(), formattedDate)
//       .input("NAME3", sql.VarChar(50), UData.NAME)
//       .input("EMAILID", sql.VarChar(50), UData.EMAILID)
//       .input("MOBILENO", sql.VarChar(50), UData.MOBILENO)
//       .input("ADHAARNO", sql.VarChar(50), UData.ADHAARNO)
//       .input("ADDRESS", sql.VarChar(50), UData.ADDRESS)
//       .input("PINCODE", sql.Int(6), UData.PINCODE)
//       .input("CITY", sql.VarChar(50), UData.CITY)
//       .input("DISTRICT", sql.VarChar(50), UData.DISTRICT)
//       .input("STATES", sql.VarChar(50), UData.STATES)
//       .input("STATUS", sql.VarChar(50), UData.STATUS);

//     // .input("STATUS", sql.VarChar(10), STATUS);

//     const q = `insert into dbo.USERLOGIN(REGDATE,NAME,EMAILID,MOBILENO,ADHAARNO,ADDRESS,PINCODE,CITY,DISTRICT,STATES,STATUS) values(@REGDATE,@NAME3,@EMAILID,@MOBILENO,@ADHAARNO,@ADDRESS,@PINCODE,@CITY,@DISTRICT,@STATES,@STATUS)`;
//     const result = await request.query(q);
//     res.json({ code: "200", message: "succesfully registerd" });
//   } catch (error) {
//     return res.status(500).json({
//       code: "500",
//       status: "error",
//       message: "Something went wrong: " + error.message,
//     });
//   }
// };


//LOGIN
const userLogin = async (req, res) => {
  try {
    console.log("userLogin API");
    const Phone = req.body.Phone;
    console.log("data", Phone);
    let userIDnumber = Number(Phone);

    console.log(typeof userIDnumber);
    console.log(typeof Phone);

    if (!Phone || !validInputValue(Phone) || !validPhone(Phone)) {
      throw new Error("Invalid Phone");
    }

    const result0 = await request.query(
      `SELECT ID,EMAILID,NAME,STATUS FROM dbo.USERLOGIN WHERE MOBILENO = ${userIDnumber}`
    );

    if (result0.recordset.length === 0) {
      return res.json({
        code: "400",
        status: "failed",
        message: "Account not registered, please create an account.",
      });
    };
    console.log("STATUS",result0.recordset[0].STATUS);

    if (result0.recordset[0].STATUS == 'INACTIVE') {
      return res.json({
        code: "400",
        status: false,
        message: "you are INACTIVE",
      });
    };

    let id = result0.recordset[0].ID;

    // Generate a 6-digit OTP with only digits
    function generateOTP(length) {
      let otp = "";

      for (let i = 0; i < length; i++) {
        otp += Math.floor(Math.random() * 10);
      }

      return otp;
    }

    let otp = generateOTP(6);
    console.log("Generated OTP:", otp);

    //update query
    await request.query(
      `UPDATE dbo.USERLOGIN SET OTP = ${otp} WHERE ID = ${id}`
    );

    res.json({ code: "200", message: "OTP successfully sent", otp: otp });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: "500",
      status: "error",
      message: "Something went wrong: " + error.message,
    });
  }
};

//VERIFY OTP
const verifyOTP = async (req, res) => {
  try {
 
    console.log("verifyOTP API");
    const OTP = req.body.OTP;
    console.log("v", OTP);

    //request.input("OTP", sql.Int(6), OTP);
    const result0 = await request.query(
      `SELECT ID,MOBILENO,NAME,EMAILID FROM dbo.USERLOGIN WHERE OTP = ${OTP}`
    );

    if (result0.recordset.length === 0) {
      return res.json({
        code: "400",
        status: "failed",
        message: "OTP does not match",
      });
    }
    let email = result0.recordset[0].EMAILID;
    let name = result0.recordset[0].NAME;
    let id = result0.recordset[0].ID;
    let phone = result0.recordset[0].MOBILENO;

    console.log("ID", email);
    let token = jwt.sign(
      {
        email: email,
        phone: phone,
        name: name,
        id: id,
      },
      "Scanning-App"
    );

    return res.status(200).json({
      data: {
        code: "200",
        message: "OTP verified successfully",
        userID: id,
        token: token,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: "500",
      status: "error",
      message: "Something went wrong: " + error,
      data: {},
    });
  }
};

// //QRValidator
// const QRValidator = async (req, res) => {
//   // const transaction = await db.beginTransaction();
//   let request = db.request();
//   try {
//     console.log("QRValidator API");
//     const ITEMDATA =req.body.ITEMCODE;
//     const userID = req.body.userID;

//     const ITEMCODE="'"+ITEMDATA+"'"
//     console.log("ITEMCODE", typeof(ITEMCODE),ITEMCODE);
//     if (!userID || !validDigit(userID)) {
//       throw new Error("Invalid userID");
//     };

//     // const request = transaction.request();

//     const result0 = await request.query(
//       `SELECT ID,NAME,MOBILENO,ADDRESS,CITY,DISTRICT,STATES FROM dbo.USERLOGIN WHERE ID = ${userID}`
//     );

//     if (result0.recordset.length === 0) {
//       return res.json({
//         code: "400",
//         status: "failed",
//         message: "userid not found",
//       });
//     };

//     //QRCODELIST TABLE
//     let result1 = await request.query(
//       `SELECT ITEMCODE,ITEMNAME,POINTS FROM dbo.QRCODELIST WHERE COUPONNO = ${ITEMCODE}`
//     );

//     if (result1.recordset.length === 0) {
//       return res.json({
//         code: "400",
//         status: "failed",
//         message: "ITEM NOT FOUND",
//       });
//     };

//     //QRCODELIST TABLE
//     const result2 = await request.query(
//       `SELECT PARTYNAME,MOBILENO,SCANDATE FROM dbo.QRCODELIST WHERE COUPONNO = ${ITEMCODE}`
//     );
//     console.log("PARTYNAME", result2.recordset[0].PARTYNAME);

//     if (result2.recordset[0].PARTYNAME !== null) {
//       return res.json({
//         code: "400",
//         status: "false",
//         message: "already scanned",
//       });
//     };
//     let moment = require('moment');
//     let date = moment();
//     let formattedDate = date.format('YYYY-MM-DD HH:mm:ss');
    
//     console.log("formattedDate", formattedDate);

//       //update query in QRCODELIST
//       request
//         .input("AT", sql.DateTime(), formattedDate)
//         .input("NAME1", sql.VarChar(50), result0.recordset[0].NAME)
//         .input("MOBILENO", sql.VarChar(50), result0.recordset[0].MOBILENO)
//         .input("ADDRESS", sql.VarChar(50), result0.recordset[0].ADDRESS)
//         .input("CITY", sql.VarChar(50), result0.recordset[0].CITY)
//         .input("DISTRICT", sql.VarChar(50), result0.recordset[0].DISTRICT)
//         .input("STATES", sql.VarChar(50), result0.recordset[0].STATES);

//       const q = `UPDATE dbo.QRCODELIST SET SCANDATE=@AT, PARTYNAME=@NAME1, ADDRESS=@ADDRESS, CITY=@CITY, DISTRICT=@DISTRICT, STATES=@STATES, MOBILENO=@MOBILENO WHERE COUPONNO = ${ITEMCODE}`;
//       const result = await request.query(q);

//       if (result.rowsAffected == 0) {
//         res.json({ code: "400", message: "QRCODE details not updated" });
//       };

//       let userName = result0.recordset[0].NAME;
//       let userMobile = result0.recordset[0].MOBILENO;

//       let userD = userName + userMobile;
//       console.log("userD", userD);
   
//       //insert in WALLET table
//       request
//       .input("ITEMCODE", sql.Int(), result1.recordset[0].ITEMCODE)
//       .input("today", sql.DateTime(), formattedDate)
//       .input("ITEMNAME", sql.VarChar(50), result1.recordset[0].ITEMNAME)
//       .input("POINTS", sql.Int(), result1.recordset[0].POINTS)
//       .input("userD", sql.VarChar(50), userD);

//     const q2 =
//       "insert into dbo.WALLET (VNO,VOUCHERSDATE,VOURCHERNAME,CR,USERNAME) values(@ITEMCODE,@today,@ITEMNAME,@POINTS,@userD)";

//       const res3 = await request.query(q2);

//       if (res3.rowsAffected == 0) {
//         res.json({ code: "400", message: "not inserted WALLET" });
//       }
//       // await db.commitTransaction(transaction);
//       res.json({ code: "200", message: "successfully scanned" });
//     //}
//   } catch (error) {
//     // await db.rollbackTransaction(transaction);
//     return res.status(500).json({
//       code: "500",
//       status: "error",
//       message: "Something went wrong: " + error.message,
//     });
//   }
// };


const purchesAPI = async (req, res) => {
  try {
    console.log("purches API");
    const ITEMCODE = (req.body.ITEMCODE).toString();
    const userID = req.body.userID;

    let request = db.request();
    

    console.log("ITEMCODE", typeof(ITEMCODE),ITEMCODE);

    if (!userID || !validDigit(userID)) {
      throw new Error("Invalid userID");
    }

    const result0 = await request.query(
      `SELECT ID,NAME,EMAILID,MOBILENO,CITY,DISTRICT,STATES FROM dbo.USERLOGIN WHERE ID = ${userID}`
    );

    if (result0.recordset.length === 0) {
      return res.json({
        code: "400",
        status: "failed",
        message: "userid not found",
      });
    }

    let userName = result0.recordset[0].NAME;
    let userMobile = result0.recordset[0].MOBILENO;
    let userEmail = result0.recordset[0].EMAILID;
    let CITY = result0.recordset[0].CITY;
    let DISTRICT = result0.recordset[0].DISTRICT;
    let STATES = result0.recordset[0].STATES;

 
    let userD = "'" + userName + userMobile + "'";
    console.log("userD", userD);

    const userPointDATA = await request.query(
      `SELECT SUM(CR) AS TotalCR ,SUM(DR) TotalDR FROM dbo.WALLET WHERE USERNAME = ${userD}`
    );
    console.log("er" + JSON.stringify(userPointDATA.recordset));
    if (userPointDATA.recordset.length === 0) {
      return res.json({
        code: "400",
        status: "failed",
        message: "no CR wallet found",
      });
    }

    let userTotalCR = userPointDATA.recordset[0].TotalCR;
    let userTotalDR = userPointDATA.recordset[0].TotalDR;
    console.log("userTotalCR", userTotalCR);

    let totaluserPoints = userTotalCR - userTotalDR;
    console.log("totaluserPoints", totaluserPoints);

    const result = await request.query(
      `SELECT ITEMNAME, POINTS, MRP FROM dbo.ITEM WHERE ITEMCODE = ${ITEMCODE}`
    );

    if (result.recordset.length === 0) {
      throw new Error(`No item found for ITEMCODE: ${ITEMCODE}`);
    }

    let totalItemPoints = result.recordset[0].POINTS;
    console.log("totalItemPoints", totalItemPoints);
   
    if (totaluserPoints >= totalItemPoints) {

      let moment = require('moment');
      let date = moment();
      let formattedDate = date.format('YYYY-MM-DD HH:mm:ss');
      
      console.log("formattedDate", formattedDate);
 

     // const todate = new Date();
      request
        .input("VN", sql.Int(), ITEMCODE)
        .input("VOUCHERSDATE", sql.DateTime(), formattedDate)
        .input("VOURCHERNAME", sql.VarChar(50), result.recordset[0].ITEMNAME)
        .input("DR", sql.Int(),totalItemPoints)
        .input("USERNAME", sql.VarChar(50),userName + userMobile);


      const q1 =
        "insert into dbo.WALLET (VNO,VOUCHERSDATE,VOURCHERNAME,DR,USERNAME) values(@VN,@VOUCHERSDATE,@VOURCHERNAME,@DR,@USERNAME)";

       await request.query(q1);
       
        request
          .input("REDEMITEMID", sql.Int(),ITEMCODE)
          .input("ITEMNAME", sql.VarChar(50),result.recordset[0].ITEMNAME)
          .input("POINTS", sql.Int(),result.recordset[0].POINTS)
          .input("ID", sql.Int(), result0.recordset[0].ID)
          .input("NAME", sql.VarChar(50), userName)
          .input("MOBILENO", sql.VarChar(50), userMobile)
          .input("CITY", sql.VarChar(50), CITY)
          .input("DISTRICT", sql.VarChar(50), DISTRICT)
          .input("STATES", sql.VarChar(50), STATES);

        const q2 =
          "INSERT INTO dbo.REDEMPTION (REDEMITEMID, ITEMNAME, POINTS, ID, NAME, MOBILENO, CITY, DISTRICT, STATES) VALUES (@REDEMITEMID, @ITEMNAME, @POINTS, @ID, @NAME, @MOBILENO, @CITY, @DISTRICT, @STATES)";
        

      const res3= await request.query(q2);

      let sendingMail=await emailfunction(userEmail,userName);
      if (sendingMail) {
       console.log("sendingMail done",sendingMail)
      } else {
        console.log("sendingMail not",sendingMail)
      };
       if (res3.rowsAffected != null) {
        return res.json({
          code: "200",
          message: `successfully redeem your item`,
        });  
      } else {
        return res.json({
          code: "400",
          message: 'something went to wrong in update try again',
        });
      }
      
   } else {
      console.log("less", totaluserPoints);
      return res.json({
        code: "400",
        message: `dont have enough points in your wallet`,
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      code: "500",
      status: "error",
      message: "Something went wrong: " + error.message,
    });
  }
};

const redeemList = async (req, res) => {
  try {
    console.log("redeemList API");
    let userID = req.body.userID;
    console.log(userID);

    if (!userID || !validInputValue(userID) || !validDigit(userID)) {
      throw new Error("Invalid userID");
    }
    const result0 = await request.query(
      `SELECT * FROM dbo.REDEMPTION WHERE ID = ${userID}`
    );

    if (result0.recordset.length === 0) {
      return res.json({
        code: "400",
        status: "failed",
        message: "not redeemed any item",
      });
    }

    const result1 = await request.query(
      `SELECT NAME,MOBILENO FROM dbo.USERLOGIN WHERE ID = ${userID}` //13
    );

    if (result0.recordset.length === 0) {
      return res.json({
        code: "400",
        status: "failed",
        message: "userID not found",
      });
    }

    let userName = result1.recordset[0].NAME;
    let userMobile = result1.recordset[0].MOBILENO;

    let userD = "'" + userName + userMobile + "'";
    console.log("userD", userD);

    let userPointDATA = await request.query(
      `SELECT SUM(DR) AS TotalDR FROM dbo.WALLET WHERE USERNAME = ${userD}`
    );

    if (
      userPointDATA.recordset.length === 0 ||
      userPointDATA.recordset[0].TotalDR === null
    ) {
      return res.json({
        code: "400",
        status: "failed",
        message: "no wallet found",
      });
    }

    let totalDR = userPointDATA.recordset[0].TotalDR;
    console.log("totalDR", totalDR);

    let recordlist = result0.recordsets[0];
    let array = [];
    array.push(recordlist);
    console.log("k", array);

    res.json({
      code: "200",
      message: "List",
      totalDR: totalDR,
      RedeemList: array,
    });
  } catch (error) {
    return res.status(500).json({
      code: "500",
      status: "error",
      message: "Something went wrong: " + error.message,
    });
  }
};

const statusApi = async (req, res) => {
  try {
    console.log("status Api");

    const userID = req.body.userID;

    //  let request = db.request();
    if (!userID || !validInputValue(userID) || !validDigit(userID)) {
      throw new Error("Invalid userID");
    }
    let status='INACTIVE';
    console.log("status",status)

    //update query
    await request.query(
      `UPDATE dbo.USERLOGIN SET STATUS = '${status}' WHERE ID = ${userID}`
    );

    res.json({ code: "200", message: "status successfully updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: "500",
      status: "error",
      message: "Something went wrong: " + error.message,
    });
  }
};

const totalPoints = async (req, res) => {
  try {
    console.log("totalPoints API");
    let userID = req.body.userID;

    const result0 = await request.query(
      `SELECT NAME,MOBILENO FROM dbo.USERLOGIN WHERE ID = ${userID}` //13
    );

    if (result0.recordset.length === 0) {
      return res.json({
        code: "400",
        status: "failed",
        message: "userID not found",
      });
    }

    let userName = result0.recordset[0].NAME;
    let userMobile = result0.recordset[0].MOBILENO;

    let userD = "'" + userName + userMobile + "'";
    console.log("userD", userD);

    let userPointDATA = await request.query(
      `SELECT SUM(CR) AS TotalCR FROM dbo.WALLET WHERE USERNAME = ${userD}`
    );

    let userPointDATA1 = await request.query(
      `SELECT SUM(DR) AS TotalDR FROM dbo.WALLET WHERE USERNAME = ${userD}`
    );

    let totalCR = userPointDATA.recordset[0].TotalCR;
    let totalDR = userPointDATA1.recordset[0].TotalDR;

    let totaluserPoints = totalDR - totalCR;
    console.log("totalDR+CR", totalDR, totalCR);

    console.log("totaluserPoints", totaluserPoints);

    if (totaluserPoints > 0) {
      res.json({
        code: "200",
        message: "userPoints",
        totaluserPoints: totaluserPoints,
      });
    } else {
      res.json({ code: "200", message: "userPoints", totaluserPoints: 0 });
    }
  } catch (error) {
    return res.status(500).json({
      code: "500",
      status: "error",
      message: "Something went wrong: " + error.message,
    });
  }
};

const claimAPI = async (req, res) => {
  try {
    console.log("claim API");

    const userID = req.body.userID;

    if (!userID || !validDigit(userID)) {
      throw new Error("Invalid userID");
    }

    const result0 = await request.query(
      `SELECT NAME,MOBILENO FROM dbo.USERLOGIN WHERE ID = ${userID}` //13
    );

    if (result0.recordset.length === 0) {
      return res.json({
        code: "400",
        status: "failed",
        message: "userID not found",
      });
    };

    let userName = result0.recordset[0].NAME;
    let userMobile = result0.recordset[0].MOBILENO;

    let userD = "'" + userName + userMobile + "'";
    console.log("userD", userD);

    let userPointDATA = await request.query(
      `SELECT SUM(CR) AS TotalCR FROM dbo.WALLET WHERE USERNAME = ${userD}`
    );

    if (
      userPointDATA.recordset.length === 0 ||
      userPointDATA.recordset[0].TotalCR === null
    ) {
      return res.json({
        code: "400",
        status: "failed",
        message: "no wallet found",
      });
    }

    let userCoin = userPointDATA.recordset[0].TotalCR;

    return res.json({
      code: "200",
      message: `total claim are : ${userCoin}`,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      code: "500",
      status: "error",
      message: "Something went wrong: " + error.message,
    });
  }
};

const historyAPI = async (req, res) => {
  try {
    console.log("history API");

    const userID = req.body.userID;

    if (!userID || !validDigit(userID)) {
      throw new Error("Invalid userID");
    }

    const result0 = await request.query(
      `SELECT NAME,MOBILENO FROM dbo.USERLOGIN WHERE ID = ${userID}` //13
    );

    if (result0.recordset.length === 0) {
      return res.json({
        code: "400",
        status: "failed",
        message: "userID not found",
      });
    };

    let userName = result0.recordset[0].NAME;
    let userMobile = result0.recordset[0].MOBILENO;

    let userD = "'" + userName + userMobile + "'";
    console.log("userD", userD);

    let userPoints = await request.query(
      `SELECT * FROM dbo.WALLET WHERE USERNAME = ${userD}`
    );    
    return res.json({
      code: "200",
      message: `History for User Points`,
      data: userPoints.recordset
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      code: "500",
      status: "error",
      message: "Something went wrong: " + error.message,
    });
  }
};

const itemListAPI = async (req, res) => {
  try {
    console.log("itemList API");
    const result0 = await request.query(
      `SELECT * FROM dbo.ITEM ` //13
    );

    if (result0.recordset.length === 0) {
      return res.json({
        code: "400",
        status: "failed",
        message: "no item found",
      });
    } 
    let data=result0.recordset
    for (var i = 0, len = data.length; i < len; i++) {
      delete data[i].QRCODE;
    }
    return res.json({
      code: "200",
      message: `Item list fetch successfully`,
      data: data
    });
  } catch (error) {
    return res.status(500).json({
      code: "500",
      status: "error",
      message: "Something went wrong: " + error.message,
    });
  }
};


// const QRValidator = async (req, res) => {
//   // const transaction = await db.beginTransaction();
//   let request = db.request();
//   try {
//     console.log("QRValidator API");
//     const ITEMCODE = req.body.ITEMCODE.toString();
//     const userID = req.body.userID;

//     console.log("ITEMCODE", typeof(ITEMCODE),ITEMCODE);

//     //  let request = db.request();
//     if (!ITEMCODE || !validDigit(ITEMCODE)) {
//       throw new Error("Invalid ITEMCODE");
//     };

//     if (!userID || !validDigit(userID)) {
//       throw new Error("Invalid userID");
//     };

//     // const request = transaction.request();

//     const result0 = await request.query(
//       `SELECT ID,NAME,MOBILENO,ADDRESS,CITY,DISTRICT,STATES FROM dbo.USERLOGIN WHERE ID = ${userID}`
//     );

//     if (result0.recordset.length === 0) {
//       return res.json({
//         code: "400",
//         status: "failed",
//         message: "userid not found",
//       });
//     };

//     //ITEM TABLE
//     let result1 = await request.query(
//       `SELECT ITEMCODE,ITEMNAME,POINTS FROM dbo.ITEM WHERE ITEMCODE = ${ITEMCODE}`
//     );

//     if (result1.recordset.length === 0) {
//       return res.json({
//         code: "400",
//         status: "failed",
//         message: "DATA NOT FOUND IN ITEM TABLE",
//       });
//     };

//     //QRCODELIST TABLE
//     const result2 = await request.query(
//       `SELECT PARTYNAME FROM dbo.QRCODELIST WHERE ITEMCODE = ${ITEMCODE}`
//     );
//     console.log("PARTYNAME", result2.recordset[0].PARTYNAME);

//     if (result2.recordset[0].PARTYNAME !== null) {
//       return res.json({
//         code: "400",
//         status: "false",
//         message: "already scanned",
//       });
//     };
//     let moment = require('moment');
//     let date = moment();
//     let formattedDate = date.format('YYYY-MM-DD HH:mm:ss');
    
//     console.log("formattedDate", formattedDate);

//       //update query in QRCODELIST
//       request
//         .input("AT", sql.DateTime(), formattedDate)
//         .input("NAME1", sql.VarChar(50), result0.recordset[0].NAME)
//         .input("MOBILENO", sql.VarChar(50), result0.recordset[0].MOBILENO)
//         .input("ADDRESS", sql.VarChar(50), result0.recordset[0].ADDRESS)
//         .input("CITY", sql.VarChar(50), result0.recordset[0].CITY)
//         .input("DISTRICT", sql.VarChar(50), result0.recordset[0].DISTRICT)
//         .input("STATES", sql.VarChar(50), result0.recordset[0].STATES);

//       const q = `UPDATE dbo.QRCODELIST SET SCANDATE=@AT, PARTYNAME=@NAME1, ADDRESS=@ADDRESS, CITY=@CITY, DISTRICT=@DISTRICT, STATES=@STATES, MOBILENO=@MOBILENO WHERE ITEMCODE = ${ITEMCODE}`;
//       const result = await request.query(q);

//       if (result.rowsAffected != null) {
//         console.log("updated QRCODELIST");
//       } else {
//         console.log("not updated QRCODELIST");
//       }


//       let userName = result0.recordset[0].NAME;
//       let userMobile = result0.recordset[0].MOBILENO;


//       let userD = userName + userMobile;
//       console.log("userD", userD);
   

//       //insert in WALLET table
//       request
//       .input("ITEMCODE", sql.Int(), result1.recordset[0].ITEMCODE)
//       .input("today", sql.DateTime(), formattedDate)
//       .input("ITEMNAME", sql.VarChar(50), result1.recordset[0].ITEMNAME)
//       .input("POINTS", sql.Int(), result1.recordset[0].POINTS)
//       .input("userD", sql.VarChar(50), userD);

//     const q2 =
//       "insert into dbo.WALLET (VNO,VOUCHERSDATE,VOURCHERNAME,CR,USERNAME) values(@ITEMCODE,@today,@ITEMNAME,@POINTS,@userD)";

//       const res3 = await request.query(q2);

//       if (res3.rowsAffected != null) {
//         console.log("inserted WALLET");
//       } else {
//         console.log("not inserted WALLET");
//       }

//       // await db.commitTransaction(transaction);
//       res.json({ code: "200", message: "successfully scanned" });
//     //}
//   } catch (error) {
//     // await db.rollbackTransaction(transaction);
//     return res.status(500).json({
//       code: "500",
//       status: "error",
//       message: "Something went wrong: " + error.message,
//     });
//   }
// };


const uploadImage = async (req, res) => {

  const imageUrl = getImageURL();

  console.log("imageUrl",imageUrl)
  res.json({ imageUrl });

 
};

function getImageURL() {
  const baseUrl = `http://192.168.100.113:${process.env.PORT || 3000}`;
  const imageUrl = `${baseUrl}/uploads/2.png`; 
  return imageUrl;
};





// CREATE PROFILE  updated inserting name+-+mobileno in NAME column
const createProfile = async (req, res) => {
  let request = db.request();
  try {

    console.log("createProfile API");

    const data = req.body;
    console.log("body", data);
    
    if (
      !data.Name ||
      !validInputValue(data.Name) ||
      !validOnlyCharacters(data.Name)
    ) {
      throw new Error("Invalid Name");
    }
    console.log("data.Name", data.Name);

    if (
      !data.Email ||
      !validInputValue(data.Email) ||
      !validEmail(data.Email)
    ) {
      throw new Error("Invalid Email");
    };
    if (
      !data.Phone  ||
      !validInputValue(data.Phone) ||
      !validPhone(data.Phone)
    ) {
      throw new Error("Invalid Phone");
    }

let userD = data.Name + ' ' + data.Phone;
let userDVarchar = userD.toString();

console.log("userDVarchar", typeof userDVarchar, userDVarchar);


    let phone = data.Phone;
    const result0 = await request.query(
      `SELECT MOBILENO FROM dbo.USERLOGIN WHERE MOBILENO = ${phone}`
    );
    console.log("result0", result0);
    if (result0.recordset.length) {
      return res.json({
        code: "400",
        status: "failed",
        message: "MOBILENO already exists, please enter unique MOBILENO ",
      });
    }

    if (
      !data.Aadhaar  ||
      !validInputValue(data.Aadhaar) ||
      !validAadhaar(data.Aadhaar)
    ) {
      throw new Error("Invalid Aadhaar");
    }

    if (
      !data.Pincode ||
      !validInputValue(data.Pincode) ||
      !validPincode(data.Pincode)
    ) {
      throw new Error("Invalid Pincode");
    }

    if (!data.address || !validInputValue(data.address)) {
      throw new Error("Invalid address");
    }

    //Matching pincode and city by axios call
    const options = {
      method: "GET",
      url: `https://api.postalpincode.in/pincode/${data.Pincode}`,
    };

    const pincodeDetail = await axios(options);

    if (pincodeDetail.data[0].PostOffice === null) {
      return res.json({
        code: "400",
        status: "failed",
        message: "pin code should be valid ",
      });
    }

    const cityNameByPinCode1 = pincodeDetail.data[0].PostOffice[0].Division;
    const cityNameByPinCode = pincodeDetail.data[0].PostOffice[0].District;
    const cityNameByPinCode2 = pincodeDetail.data[0].PostOffice[0].State;

    let moment = require('moment');
    let date = moment();
    let formattedDate = date.format('YYYY-MM-DD HH:mm:ss');
    
    console.log("formattedDate", formattedDate);


    let UData = {
      NAME: userDVarchar,
      EMAILID: data.Email,
      MOBILENO: data.Phone,
      ADHAARNO: data.Aadhaar,
      PINCODE: data.Pincode,
      CITY: cityNameByPinCode1,
      DISTRICT: cityNameByPinCode,
      STATES: cityNameByPinCode2,
      ADDRESS: data.address,
      STATUS:'ACTIVE'
    };
    console.log("d", UData);
   // let request = db.request();
    request
      .input("REGDATE", sql.DateTime(), formattedDate)
      .input("NAME3", sql.VarChar(50), UData.NAME)
      .input("EMAILID", sql.VarChar(50), UData.EMAILID)
      .input("MOBILENO", sql.VarChar(50), UData.MOBILENO)
      .input("ADHAARNO", sql.VarChar(50), UData.ADHAARNO)
      .input("ADDRESS", sql.VarChar(50), UData.ADDRESS)
      .input("PINCODE", sql.Int(6), UData.PINCODE)
      .input("CITY", sql.VarChar(50), UData.CITY)
      .input("DISTRICT", sql.VarChar(50), UData.DISTRICT)
      .input("STATES", sql.VarChar(50), UData.STATES)
      .input("STATUS", sql.VarChar(50), UData.STATUS);

    // .input("STATUS", sql.VarChar(10), STATUS);

    const q = `insert into dbo.USERLOGIN(REGDATE,NAME,EMAILID,MOBILENO,ADHAARNO,ADDRESS,PINCODE,CITY,DISTRICT,STATES,STATUS) values(@REGDATE,@NAME3,@EMAILID,@MOBILENO,@ADHAARNO,@ADDRESS,@PINCODE,@CITY,@DISTRICT,@STATES,@STATUS)`;
    const result = await request.query(q);
    res.json({ code: "200", message: "succesfully registerd" });
  } catch (error) {
    return res.status(500).json({
      code: "500",
      status: "error",
      message: "Something went wrong: " + error.message,
    });
  }
};

//QRValidator updated inserting item points in wallet DR
const QRValidator = async (req, res) => {
  // const transaction = await db.beginTransaction();
  let request = db.request();
  try {
    console.log("QRValidator API");
    const ITEMDATA =req.body.ITEMCODE;
    const userID = req.body.userID;

    const ITEMCODE="'"+ITEMDATA+"'";
    console.log("ITEMCODE", typeof(ITEMCODE),ITEMCODE);
    if (!userID || !validDigit(userID)) {
      throw new Error("Invalid userID");
    };

    // const request = transaction.request();

    const result0 = await request.query(
      `SELECT ID,NAME,MOBILENO,ADDRESS,CITY,DISTRICT,STATES FROM dbo.USERLOGIN WHERE ID = ${userID}`
    );

    if (result0.recordset.length === 0) {
      return res.json({
        code: "400",
        status: false,
        message: "userid not found",
      });
    };

    //QRCODELIST TABLE
    let result1 = await request.query(
      `SELECT ITEMCODE,ITEMNAME,POINTS,COUPONNO FROM dbo.QRCODELIST WHERE COUPONNO = ${ITEMCODE}`
    );

    if (result1.recordset.length === 0) {
      return res.json({
        code: "400",
        status: false,
        message: "ITEM NOT FOUND",
      });
    };

    //QRCODELIST TABLE
    const result2 = await request.query(
      `SELECT PARTYNAME,MOBILENO,SCANDATE FROM dbo.QRCODELIST WHERE COUPONNO = ${ITEMCODE}`
    );
    console.log("PARTYNAME", result2.recordset[0].PARTYNAME);

    if (result2.recordset[0].PARTYNAME !== null) {
      return res.json({
        code: "400",
        status: false,
        message: "already scanned",
      });
    };
    let moment = require('moment');
    let date = moment();
    let formattedDate = date.format('YYYY-MM-DD HH:mm:ss');

    request = db.request();
    
    console.log("formattedDate", formattedDate);

      //update query in QRCODELIST
      request
        .input("AT", sql.DateTime(), formattedDate)
        //.input("SCANVONO", sql.DateTime(), )
        .input("NAME1", sql.VarChar(50), result0.recordset[0].NAME)
        .input("MOBILENO", sql.VarChar(50), result0.recordset[0].MOBILENO)
        .input("ADDRESS", sql.VarChar(50), result0.recordset[0].ADDRESS)
        .input("CITY", sql.VarChar(50), result0.recordset[0].CITY)
        .input("DISTRICT", sql.VarChar(50), result0.recordset[0].DISTRICT)
        .input("STATES", sql.VarChar(50), result0.recordset[0].STATES);

      const q = `UPDATE dbo.QRCODELIST SET SCANDATE=@AT, PARTYNAME=@NAME1, ADDRESS=@ADDRESS, CITY=@CITY, DISTRICT=@DISTRICT, STATES=@STATES, MOBILENO=@MOBILENO WHERE COUPONNO = ${ITEMCODE}`;
      const result = await request.query(q);

      if (result.rowsAffected == 0) {
        res.json({ code: "400", message: "QRCODE details not updated" });
      };

      let userName = result0.recordset[0].NAME;
      newName=userName.split('-')[0];
      console.log("newName",newName);
      // let userMobile = result0.recordset[0].MOBILENO;
      request = db.request();


      request
          .input("AT1", sql.DateTime(), formattedDate)
          .input("COUPONCODE", sql.VarChar(),ITEMDATA)
          .input("ITEMNAME1", sql.VarChar(50),result1.recordset[0].ITEMNAME)
          .input("POINTS1", sql.Int(),result1.recordset[0].POINTS)
          .input("ID1", sql.Int(), result0.recordset[0].ID)
          .input("NAME1", sql.VarChar(50), userName)
          .input("MOBILENO1", sql.VarChar(50),result0.recordset[0].MOBILENO)
          .input("CITY1", sql.VarChar(50), result0.recordset[0].CITY)
          .input("DISTRICT1", sql.VarChar(50), result0.recordset[0].DISTRICT)
          .input("STATES1", sql.VarChar(50), result0.recordset[0].STATES);

        const q3 =
          "INSERT INTO dbo.SCANCOUPON (VDATE,COUPONCODE, ITEMNAME, POINTS, ID, NAME, MOBILENO, CITY, DISTRICT, STATES) VALUES (@AT1,@COUPONCODE, @ITEMNAME1, @POINTS1, @ID1, @NAME1, @MOBILENO1, @CITY1, @DISTRICT1, @STATES1)";
        

      const res4= await request.query(q3);

      if (res4.rowsAffected == 0) {
        res.json({ code: "400", message: "not inserted SCANCOUPON" });
      }

      let userD = userName
      console.log("userD", userD);
   
      //insert in WALLET table
      request
      .input("ITEMCODE", sql.Int(), result1.recordset[0].ITEMCODE)
      .input("today", sql.DateTime(), formattedDate)
      .input("ITEMNAME", sql.VarChar(50), result1.recordset[0].ITEMNAME)
      .input("POINTS", sql.Int(), result1.recordset[0].POINTS)
      .input("userD", sql.VarChar(50), userD);

    const q2 =
      "insert into dbo.WALLET (VNO,VOUCHERSDATE,VOURCHERNAME,DR,USERNAME) values(@ITEMCODE,@today,@ITEMNAME,@POINTS,@userD)";

      const res3 = await request.query(q2);

      if (res3.rowsAffected == 0) {
        res.json({ code: "400", message: "not inserted WALLET" });
      }
      // await db.commitTransaction(transaction);
      res.json({ code: "200", message: "successfully scanned" });
    //}
  } catch (error) {
    // await db.rollbackTransaction(transaction);
    return res.status(500).json({
      code: "500",
      status: "error",
      message: "Something went wrong: " + error.message,
    });
  }
};

// updated getprofile of userID 
const getProfileDetails = async (req, res) => {
  try {
    console.log("getProfileDetails API");

    const user = req.user; //decoded token
    let userID = user.id;
    console.log("from token userID", userID);

    const result = await request.query(
      `select * from dbo.USERLOGIN where ID = ${userID}`
    );

    if (result.recordset.length === 0) {
      return res.json({
        code: "400",
        status: "failed",
        message: "no data found",
      });
    };

    let userName = result.recordset[0].NAME;
      newName=userName.split('-')[0]
      console.log("newName",newName)

    let obj = {
      ID: result.recordset[0].ID,
      NAME: newName,
      EMAILID: result.recordset[0].EMAILID,
      MOBILENO: result.recordset[0].MOBILENO,
      ADHAARNO: result.recordset[0].ADHAARNO,
      PINCODE: result.recordset[0].PINCODE,
      ADDRESS: result.recordset[0].ADDRESS,
      CITY: result.recordset[0].CITY,
      DISTRICT: result.recordset[0].DISTRICT,
      STATES: result.recordset[0].STATES,
    };
    console.log("m", obj);
    let arr = [];
    arr.push(obj);
    res.json({ code: "200", message: "userDetails", data: arr });
  } catch (error) {
    return res.status(500).json({
      code: "500",
      status: "error",
      message: "Something went wrong: " + error.message,
    });
  }
};




module.exports = {
  getProfileDetails,
  createProfile,
  userLogin,
  verifyOTP,
  QRValidator,
  redeemList,
  purchesAPI,
  statusApi,
  totalPoints,
  claimAPI,
  historyAPI,
  itemListAPI,
  uploadImage,
};

