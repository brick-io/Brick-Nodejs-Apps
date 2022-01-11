# Brick Node SDK
The official node.js client library for the [OneBrick](https://www.onebrick.io/) API.

## Table of Contents

* [Install](###Install)
* Getting Started
* Example
 	 - Authenticate the Account 
	 - List Institution
	 - Connect Bank Account 
	 - Connect Ecommerce Account
	 - Connect EWallet Account
	 - Connect Corporate Bank Account
	 - Connect Income Verification Account

* 	 Error Handling

### Install

```
$ npm install onebrick-node-sdk
```

it will install latest onebricksdk

### Getting Started

The module supports all Onebrick API endpoints. For complete information about the API, head to the [docs](https://docs.onebrick.io/).

Most endpoints require a valid `clientKey` and `clientSecret` as authentication. Attach them via the configuration init.

```
const { BrickSDK, ENVIRONMENT } = require("onebrick-node-sdk");

let sdk = new BrickSDK(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  ENVIRONMENT.SANDBOX,
  process.env.NAME,
  process.env.REDIRECT_URL
);
```

The `ENVIRONMENT` parameter dictates which Onebrick API environment you will access. Values are:

ENVIRONMENT.PRODUCTION - uproduction use

ENVIRONMENT.SANDBOX - quickly build out your integration

### Example

**Authenticate the Account:**

After init SDK this is one thing that you need to do

```
    let a = await sdk.requestAccessToken();
    let b = await sdk.requestAuthentication();
```

**List Institution:**


```
let listInstitution = await sdk.listInstitution();
```

it will return:

```
{
  status: 200,
  message: 'OK',
  data: [/*array of institution*/]
  }
```

**Connect Bank Account**

You can connect bank account and also with specific field like `username`, `password`,`institution_id` from list institution

```
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
```

**Connect Ecommerce Account**

In this section you will do 2 step
  -  First you need to connect ecommerce account  with specific field like `username`, `password`,`institution_id` from list institution
  -  Second, you need to put an OTP from the ecommerce itself

Authenticate Account

```
sdk.authenticateWithEcommerce(username.toString(), password.toString(), parseInt(institutionId.toString())).then((data) => {

}).catch((err) => {


})
```

Input OTP

```
  sdk.reAuthenticationWithEcommerce(otp.toString(), parseInt(institutionId.toString())).then((dataOtp) => {
  
  }).catch((error) => {
  
  })
```

