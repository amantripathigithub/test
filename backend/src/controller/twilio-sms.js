// TWILIO_ACCOUNT_SID = "AC4ae03e7e20004c00342ad97b10337854"
// TWILIO_AUTH_TOKEN = "7f05f5f9825888ff0ce171d4b640c5de"
// TWILIO_SERVICE_SID = "VAd7f66546099e43f7d46310b5c2bdd997"




const{TWILIO_SERVICE_SID,TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN} = process.env;
const client = require('twilio')(TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN,{
    lazyLoading: true
})


/**
 * send OTP
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

const sendOTP = async(req,res,next)=>{
    const{countryCode , phoneNumber} = req.body;
    try{
        const otpResponse = await client.verify
        .services(TWILIO_SERVICE_SID)
        .verifications.create({
            to: `+${countryCode}${phoneNumber}`,
            channel: "sms",
        });
        res.status(200).send(`send succesfully : ${JSON.stringify(otpResponse)}`);

    } catch(error){
        res.status(error?.status||400).send(error?.message||"something went wrong");
    }

};

/**
 * verify OTP
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */


const verifyOTP = async(req,res,next)=>{
    const{countryCode , phoneNumber , otp} = req.body;
    try{
        const verifiedResponse = await client.verify
        .services(TWILIO_SERVICE_SID)
        .verificationsChecks.create({
            to: `+${countryCode}${phoneNumber}`,
            code:otp,
        });
        res.status(200).send(`otp verified : ${JSON.stringify(verfiedResponse)}`);
    }catch(error){
        res.status(error?.status||400).send(error?.message||"something went wrong");
    }
}
