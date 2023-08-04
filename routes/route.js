const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth=require('../middlewares/auth');




router.get('/getProfileDetails',auth.authentication,userController.getProfileDetails);
router.post('/createProfile',userController.createProfile);
router.post('/userLogin',userController.userLogin);
router.post('/verifyOTP',userController.verifyOTP);

router.post('/QRValidator',auth.authentication,auth.authorisation,userController.QRValidator);
router.post('/redeemList',auth.authentication,auth.authorisation,userController.redeemList);

router.post('/purchesAPI',auth.authentication,auth.authorisation,userController.purchesAPI);
router.post('/statusApi',auth.authentication,auth.authorisation,userController.statusApi);
router.post('/totalPoints',auth.authentication,auth.authorisation,userController.totalPoints);

router.post('/getPointHistory',auth.authentication,auth.authorisation,userController.claimAPI);
router.post('/getHistoryById',auth.authentication,auth.authorisation,userController.historyAPI);


router.get('/itemList',userController.itemListAPI);
router.post('/uploadImage',userController.uploadImage);






//handle invalid route


router.all("/*", function (req, res) {
  res
    .status(400)
    .send({ code :"400", status: false, message: "invalid http request" });
});

 module.exports = router;