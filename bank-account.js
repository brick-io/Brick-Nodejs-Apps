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

async function initBankAccount() {
  await initSDK();
  /**
   * first input institution ID
   */
  rl.question("Put Bank Institution ID  ", function (institutionId) {
      /**
       * then input username
       */
    rl.question("Put Bank username ? ", function (username) {
        /**
         * then input password credentials for bank/institution
         */
      rl.question("Put Bank password ? ", function (password) {
        sdk
          .authenticateWithBank(
            username.toString(),
            password.toString(),
            parseInt(institutionId.toString())
          )
          .then((data) => {
            console.log(data);
            rl.close();
          })
          .catch((err) => {
            console.log(err);
            rl.close();
          });
      });
    });
  });
  rl.on("close", function () {
    console.log("\nBYE BYE !!!");
    process.exit(0);
  });
}

initBankAccount();
