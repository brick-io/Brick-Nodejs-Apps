
## Account Get

The Account List endpoint returns all a list of accounts or products (and their associated data) held by the End User with a Provider.


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
sdk.requestAccountGeneral(accessToken).then(
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
      "accountId": "001800412324242",
      "accountHolder": "JOHN DOE",
      "accountNumber": "80010023203223",
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

## Account List MFA
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
sdk.requestAccountGeneralMFA(accessToken).then(
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
      "accountId": "001800412324242",
      "accountHolder": "JOHN DOE",
      "accountNumber": "80010023203223",
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


