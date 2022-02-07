const { BrickSDK, ENVIRONMENT } = require("onebrick-node-sdk");
const readline = require("readline");


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

async function main() {
  rl.question("PUT USER ACCESSS TOKEN  :", function (accessToken) {
    rl.question("INSTITUTION ID  :", function (institutionId) {
      sdk
        .requestAccountDetailGeneral(accessToken, institutionId)
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
}
main();
