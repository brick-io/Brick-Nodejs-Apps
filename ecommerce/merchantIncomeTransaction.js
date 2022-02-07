const { BrickSDK, ENVIRONMENT } = require("onebrick-node-sdk");
const readline = require("readline");

const clientId = "2193af78-1bbe-4a00-b03f-694c11c552fc";
const clientSecret = "xJrbT2993YP89wxy8lK4TPdj72RcYT";
const name = "BRICK";
const url = "https://onebrick.io";

let sdk = new BrickSDK(clientId, clientSecret, ENVIRONMENT.SANDBOX, name, url);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  rl.question("PUT USER ACCESSS TOKEN  :", function (accessToken) {
    rl.question("DATE START  DD-MM-YYYY:", function (start) {
      rl.question("DATE END DD-MM-YYYY:", function (end) {
        sdk
          .requestEcommerceMerchantIncome(accessToken, start, end)
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
  });
}
main();
