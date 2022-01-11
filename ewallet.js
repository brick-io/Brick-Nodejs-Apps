const readline = require("readline");
const { BrickSDK, ENVIRONMENT } = require("onebrick-node-sdk");
require('dotenv').config();

let sdk = new BrickSDK(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  ENVIRONMENT.SANDBOX,
  process.env.NAME,
  process.env.REDIRECT_URL
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function initSDK() {
    let a = await sdk.requestAccessToken();
    let b = await sdk.requestAuthentication();
    console.log("init SDK Done");
}
async function initEwalletAccount() {
    await initSDK();
    rl.question("Put Ewallet Institution ID  ", function (institutionId) {
        rl.question("Put Ewallet Phone Number ? ", function (username) {

            sdk.authenticateWithEwallet(username.toString(), parseInt(institutionId.toString())).then((data) => {
                console.log(data);
                if (institutionId == 12) {
                    rl.question("input PIN ", function (otp) {
                        rl.question('input url link', function (url) {
                            sdk.reauthenticateWithOTPEwallletAndLink(parseInt(institutionId.toString()), otp.toString(), url.toString(), ).then((dataOtp) => {
                                console.log(dataOtp)
                                rl.close();
                            }).catch((err) => {
                                console.log(err.response.data);
                                rl.close();
                            });
                        })
                    })
                } else {
                    rl.question("input OTP ", function (otp) {
                        sdk.reauthenticateWithOTPEwalllet(otp.toString(), parseInt(institutionId.toString())).then((dataOtp) => {
                            console.log(dataOtp)
                            rl.close();
                        }).catch((err) => {
                            console.log(err.response.data);
                            rl.close();
                        });
                    })
                }


            }).catch((err) => {
                console.log(err.response.data);
                rl.close();
            });
        })
    });
    rl.on("close", function () {
        console.log("\nBYE BYE !!!");
        process.exit(0);
    });
}
initEwalletAccount();