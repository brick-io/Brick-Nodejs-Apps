/**
 * 
 * this example is for ecommerce account like tokopedia and shopee
 */
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

async function initEcommerceAccount() {
    await initSDK();
    rl.question("Put ecommerce Institution ID  ", function (institutionId) {
        rl.question("Put ecommerce username ? ", function (username) {
            rl.question("Put ecommerce password ? ", function (password) {

                sdk.authenticateWithEcommerce(username.toString(), password.toString(), parseInt(institutionId.toString())).then((data) => {
                    rl.question("input OTP ", function (otp) {
                        sdk.reAuthenticationWithEcommerce(otp.toString(), parseInt(institutionId.toString())).then((dataOtp) => {
                            console.log(dataOtp)
                            rl.close();
                        }).catch((err) => {
                            console.log(err);
                            rl.close();
                        });
                    })
                }).catch((err) => {
                    console.log(err);
                    rl.close();
                });
            })

        });
    });
    rl.on("close", function () {
        console.log("\nBYE BYE !!!");
        process.exit(0);
    });
}

initEcommerceAccount();