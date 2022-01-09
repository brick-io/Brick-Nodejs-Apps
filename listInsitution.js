const { BrickSDK, ENVIRONMENT } = require("onebrick-node-sdk");
require('dotenv').config();

let sdk = new BrickSDK(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  ENVIRONMENT.SANDBOX,
  process.env.NAME,
  process.env.REDIRECT_URL
);
console.log(process.env.CLIENT_ID);
/**
 * first you need to authenticate yourself
 * get access token
 * then request authentication
 */
async function initSDK() {
  let a = await sdk.requestAccessToken();
  let b = await sdk.requestAuthentication();

}

async function listInstitution() {
  let listInstitution = await sdk.listInstitution();
  console.log(listInstitution)
}

async function testExample() {
  await initSDK();
  await listInstitution();
}
testExample();
