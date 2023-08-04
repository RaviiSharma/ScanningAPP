// const mongoose = require('mongoose')


// const validInputBody = function (object) {
//     return Object.keys(object).length > 0
// }


const validInputValue = function (value) {
    if (typeof value !== 'undefined' && value !== null && typeof value === 'string' && value.length > 0) {
      return true;
    } else {
      throw new Error('Invalid value');
    }
  };
  
  
  const validOnlyCharacters = function (value) {
    if(/^[A-Za-z\s]+$/.test(value)){
      return true;
    }else{
      throw new Error('invalid characters')
    }
    
  }
  
  
  const validEmail = function (email) {
      const regexForEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if( regexForEmail.test(email)){
          return true;
      }else{
          throw new Error('Invalid Email');
      }
      
  };
  
  const validPhone = function (phone) {
      const regexForMobile = /^[6-9]\d{9}$/;
      if(regexForMobile.test(phone)){
        return true;
      }else{
         throw new Error('invlid phone/mobile number')
      }
     
  };
  
  
  const validNumber = function (value) {
      if (typeof (value) === "undefined" || value === null) return false;
      if (typeof (value) === "string" && value.trim().length > 0 && Number(value) !== NaN && Number(value) >= 0) return true
      if (typeof (value) === "number" && value >= 0) return true;
      return false;
  };
  
  const validPincode = function (pincode) {
      const regexForPass = /^[1-9][0-9]{5}$/
      return regexForPass.test(pincode);
  };
  
  const validPrice = function (price) {
      let regexForPrice = /^[1-9]{1}\d*((\.)\d+)?$/
      return regexForPrice.test(price)
  };
  
  const validObjectId = function (objectId) {
      return mongoose.Types.ObjectId.valid(objectId);
  };
  
  const validImageType = function (value) {
      const regexForMimeTypes = /image\/png|image\/jpeg|image\/jpg/;
      return regexForMimeTypes.test(value)
  }
  
  
  //---------------------------------------NEW VALIDATIONS ------------------------------------------------------
  
  function ValidPassword(input) {
      // Regular expression pattern
      const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{4,}$/;
    
      // Check if the input matches the pattern
      if (pattern.test(input)) {
        return true; // Input is valid
      } else {
        throw new Error('password contain At least 4 characters long  one letter (uppercase or lowercase) one digit include & one special character'); // Throw an error if input is invalid
      }
    }
  
  
    function ValidPasswordAlfaNumeric(input) {
      // Regular expression pattern
      const pattern = /^[a-zA-Z0-9@#$*]{6,12}$/;
    
      // Check if the input matches the pattern
      if (pattern.test(input)) {
        return true; // Input is valid
      } else {
        throw new Error('password contain [a-zA-Z0-9@#$*] matches any alphanumeric character, @, #, $, or * min 6 and  max 12 length only'); // Throw an error if input is invalid
      }
    }
  
    function validDigit(input) {
      // Regular expression pattern
      const pattern = /^\d+$/;
    
      // Check if the input matches the pattern
      if (pattern.test(input)) {
        return true; // Input is valid
      } else {
        throw new Error('Invalid digits'); // Throw an error if input is invalid
      }
    }
  
    function validDate(input) {
      // Regular expression pattern
      const pattern = /^\d{4}-\d{2}-\d{2}$/;
    
      // Check if the input matches the pattern
      if (pattern.test(input)) {
        return true; // Input is valid
      } else {
        throw new Error('Invalid date format'); // Throw an error if input is invalid
      }
    }
  
    function 
    validDateTime(input) {
      // Regular expression pattern
      const pattern = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    
      // Check if the input matches the pattern
      if (pattern.test(input)) {
        return true; // Input is valid
      } else {
        throw new Error('Invalid date & time format'); // Throw an error if input is invalid
      }
    }
  
    function validIFSC(input) {
      // Regular expression pattern
      const pattern =   /^[A-Za-z]{4}[0][A-Za-z0-9]{6}$/;
    
      // Check if the input matches the pattern
      if (pattern.test(input)) {
        return true; // Input is valid
      } else {
        throw new Error('Invalid IFSC format'); // Throw an error if input is invalid
      }
    }
  
  
    function validCharNum(input) {
      // Regular expression pattern
      const pattern =  /^[a-zA-Z0-9]+$/;
    
      // Check if the input matches the pattern
      if (pattern.test(input)) {
        return true; // Input is valid
      } else {
        throw new Error('Invalid char & Num'); // Throw an error if input is invalid
      }
    }
  
    function validAadhaar(aadharNumber) {
      // Regular expression pattern
      const pattern =  /^\d{12}$/;
    
      // Check if the input matches the pattern
      if (pattern.test(aadharNumber)) {
        return true; // Input is valid
      } else {
        throw new Error('Invalid Aadhar Number'); // Throw an error if input is invalid
      }
    };
  
    function isValidURL(url) {
      try {
        new URL(url);
        return true;
      } catch (error) {
        return false;
      }
    }
  
    
  
  module.exports = {
      
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
      ValidPasswordAlfaNumeric,
      validDigit,
      validDate,
      
      validDateTime,
      validIFSC,
      validCharNum,
      validAadhaar,
      isValidURL
  
  };