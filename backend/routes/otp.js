require('dotenv').config();
const express = require('express');
const router = express.Router();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;
const client = require('twilio')(accountSid, authToken);

//Send OTP
router.post('/send-otp', async(req,res)=>{
    const {countryCode, phoneNumber} = req.body;
    //Checks 10 digits phone number and phoneNumber only contains numbers
    if(phoneNumber.length!=10 || !(/^[0-9]*$/.test(phoneNumber))){
        return res.status(400).json({message:'Enter 10 digits numbers only!'});
    }
    try{
        const otpResponse = await client.verify.v2
        .services(serviceSid)
        .verifications.create({
            to: `+${countryCode}${phoneNumber}`,
            channel: "sms"
        });
        console.log(otpResponse);
        res.status(200).json({message: 'OTP send successfully!'});
    }
    catch(err){
        res.status(err.status || 500).json({message:err.message});
    }
});

//Verify OTP
router.post('/verify-otp', async(req,res)=>{
    const {countryCode, phoneNumber, otp} = req.body;
    //Checks 10 digits phone number and phoneNumber only contains numbers
    if(phoneNumber.length!=10 || !(/^[0-9]*$/.test(phoneNumber))){
        return res.status(400).json({message:'Enter 10 digits numbers only!'});
    }
    try{
        const verifiedResponse = await client.verify.v2
        .services(serviceSid)
        .verificationChecks.create({
            to: `+${countryCode}${phoneNumber}`,
            code: otp
        });
        console.log(verifiedResponse);
        if(verifiedResponse.status==='approved'){
            return res.status(200).json({message: 'OTP verified successfully!'});
        }
        else{
            return res.status(400).json({message: 'OTP entered is wrong!'})
        }
    }
    catch(err){
        res.status(err.status || 500).json({message:err.message});
    }
});

module.exports = router;