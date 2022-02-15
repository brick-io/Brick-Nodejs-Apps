
## Transaction List

The Transaction List endpoint returns all a list of Transactions or products (and their associated data) held by the End User with a Provider.


```
const { BrickSDK, 
ENVIRONMENT } = require("onebrick-node-sdk");

const readline = require("readline");
let sdk = new BrickSDK(
  process.env.CLIENT_ID, process.env.CLIENT_SECRET, 
  ENVIRONMENT.SANDBOX, process.env.NAME, 
  process.env.REDIRECT_URL
);
let accessToken = `access-token that you get from previous process, not public access-token`
let institutionId = `institution ID that you want to get the detail`
sdk.requestTransactionDetailGeneral(accessToken, institutionId).then(
  (data) => { console.log(data);
}
).catch(
  (err) => { console.log(err);
}
);
```

**Response Success**

```
{
  "status": 200,
  "message": "OK",
  "lastUpdateAt": "2022-01-04 16:42 GMT+0700",
  "session": "valid",
  "data": {
    "email": "john@doe.com",
    "address": ",CIPETE,PINANG /KOTA TANGERANG,CIPETE,INDONESIA,15810",
    "phoneNumber": "08123456789",
    "ktpNumber": null,
    "TransactionId": "001800412324242",
    "TransactionHolder": "John Doe",
    "TransactionNumber": "80010023203223",
    "balances": {
      "available": 142890.37,
      "current": 1428907.3
    }
  }
}
```
**Response Transaction Not Found**
```
{
  "status": 200,
  "message": "Transaction not found",
  "data": null,
  "error_code": "2006",
  "error_message": "Transaction not found"
}
```
**Response Failed**
```
{
  "status": 401,
  "message": "Unauthorized",
  "data": "Unauthorized",
  "error_code": "0002",
  "error_message": "Invalid user-access-token"
}
```

## Transaction List MFA
This function can be used to refresh the session of institution with MFA by sending new OTP to end user. Currently, E-Wallet can use this customization.

```
const { BrickSDK, 
ENVIRONMENT } = require("onebrick-node-sdk");
const readline = require("readline");

let sdk = new BrickSDK(
  process.env.CLIENT_ID, process.env.CLIENT_SECRET, 
  ENVIRONMENT.SANDBOX, process.env.NAME, 
  process.env.REDIRECT_URL
);
let accessToken = `access-token that you get from previous process, not public access-token`
.requestTransactionGeneraDetailMFA(accessToken).then(
  (data) => { console.log(data);
}
).catch(
  (err) => { console.log(err);
}
);
```

**Response Success**

```
{
  "status": 200,
  "message": "OK",
  "lastUpdateAt": "2022-01-04 16:42 GMT+0700",
  "session": "valid",
  "data": [
    {
      "TransactionId": "001800412324242",
      "TransactionHolder": "JOHN DOE",
      "TransactionNumber": "80010023203223",
      "balances": {
        "available": 32395.66,
        "current": 32395.66
      }
    }
  ]
}
```
**Response Failed**
```
{
  "status": 401,
  "message": "Unauthorized",
  "data": "Unauthorized",
  "error_code": "0002",
  "error_message": "Invalid user-access-token"
}
```


