/**
 * 
 * this example is for Coorporate Banking Bank
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
}

async function main() {
    await initSDK();
    rl.question("Put Bank Institution ID  ", function (institutionId) {
        rl.question("Put Bank username ? ", function (username) {
            rl.question("Put Bank password ? ", function (password) {

                sdk.authenticateCorporateBanking(parseInt(institutionId.toString()), username.toString(), password.toString(), ).then((data) => {
                    console.log(data);
                    rl.question("Put Bank userId ? ", function (userId) {
                        rl.question("Put Bank corporateId ? ", function (corporateId) {
                            rl.question("Put Bank token ? ", function (token) {
                                sdk.rerequestAuthenticateionCoorporateBanking(parseInt(institutionId.toString()), userId, corporateId, token).then((result) => {
                                    console.log(result.data);
                                    rl.close();
                                })
                            })
                        })
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

main();