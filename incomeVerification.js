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

async function initIncomeVerification() {
    await initSDK();
    rl.question("Put Income Verification Institution ID  ", function (institutionId) {
        rl.question("Put Income Verification username ? ", function (username) {
            rl.question("Put Income Verification password ? ", function (password) {

                sdk.authenticateWithBank(username.toString(), password.toString(), parseInt(institutionId.toString())).then((data) => {
                    console.log(data);
                    rl.close();
                }).catch((err) => {
                    console.log(err.response.data);
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

initIncomeVerification();