const express = require('express');
const request = require('request');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const { json } = require('express');
require('dotenv').config()

app.use(express.static(path.join(__dirname, 'build')))

// Here we need a way to send your static files to the client. This can be achieved with a reverse proxy like Nginx, or simply using express.static(). 
// Put all your “static” (css, js, images) files in a folder dedicated to it, different from where you put your “views” (html files in your case). 
// I’ll call it static for the example. Once it’s done, add this line in your server code:
app.use("/static", express.static('./static/'))

app.get('/', function (req, res) {
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
})

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //หรือใส่แค่เฉพาะ domain ที่ต้องการได้
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

let headersObj = {
  CONTROLKEY: '',
  Authorization: '',
}

app.post(process.env.AUTHEN_PATH, (req, res) => {
  request({ 
    uri: process.env.AUTHEN_API_URL, 
    form: {
      username: process.env.AUTHEN_USERNAME,
      password: process.env.AUTHEN_PASSWORD,
      project: process.env.AUTHEN_PROJECT,
      system: process.env.AUTHEN_SYSTEM,
    },
    method: 'POST'
  }, function (err, response, body) {
    const jsonBody = JSON.parse(response.body)
    headersObj.CONTROLKEY = jsonBody["CONTROLKEY"]
    headersObj.Authorization = jsonBody["Authorization"]
    const responseToClient = { msgCode: jsonBody.msgCode }
    res.send(responseToClient)
    console.log('AUTHEN_PATH response to client: ', responseToClient)
  });
})

app.get(process.env.CHECK_IS_CONSENT_PATH, function(req, res) {
    request({
      headers: {
        CONTROLKEY: headersObj.CONTROLKEY,
        Authorization: headersObj.Authorization,
        "content-Type": "application/json",
      },
      uri: process.env.CHECK_IS_CONSENT_API_URL,
      body: JSON.stringify({ 
        masterConsentCode: process.env.MASTER_CONSENT_CODE,
        system: process.env.SYSTEM,
        project: process.env.PROJECT,
        ...req.query 
      }),
      method: 'GET'
    }, function (err, response, body) {
      const jsonBody = JSON.parse(response.body)
      const responseToClient = { isConsent: jsonBody.isConsent, msgCode: jsonBody.msgCode }
      res.send(responseToClient)
      console.log('CHECK_IS_CONSENT_PATH response to client: ', responseToClient)
    });
});

app.get(process.env.GET_MASTER_CONSENT_PATH, function(req, res) {
    request({
      headers: {
        CONTROLKEY: headersObj.CONTROLKEY,
        Authorization: headersObj.Authorization,
        "content-Type": "application/json",
      },
      uri: process.env.GET_MASTER_CONSENT_API_URL,
      body: JSON.stringify({ 
        masterConsentCode: process.env.MASTER_CONSENT_CODE,
        system: process.env.SYSTEM,
        project: process.env.PROJECT,
        ...req.query 
      }),
      method: 'GET'
    }, function (err, response, body) {
      const jsonBody = JSON.parse(response.body)
      const responseToClient = { 
        masterConsent: { consentBodyHtmlText: jsonBody.masterConsent?.consentBodyHtmlText }, 
        msgCode: jsonBody.msgCode
      }
      res.send(responseToClient)
      console.log('GET_MASTER_CONSENT_PATH response to client: ', responseToClient)
    });
  });
  
  app.post(process.env.SAVE_CONSENT_INFO_PATH, function(req, res) {
    request({
      headers: {
        CONTROLKEY: headersObj.CONTROLKEY,
        Authorization: headersObj.Authorization,
        "content-Type": "application/json",
      },
      uri: process.env.SAVE_CONSENT_INFO_API_URL,
      body: JSON.stringify({
        system: process.env.SYSTEM,
        project: process.env.PROJECT,
        channel: process.env.CHANNEL,
        masterConsentCode: process.env.MASTER_CONSENT_CODE,
        masterConsentVersion: process.env.MASTER_CONSENT_VERSION,
        consentHeaderHtmlText: process.env.CONSENT_HEADER_HTML_TEXT,
        consentBodyHtmlText: process.env.CONSENT_BODY_HTML_TEXT,
        consentFooterHtmlText: process.env.CONSENT_FOOTER_HTML_TEXT,
        consentFullHtmlText: process.env.CONSENT_FULL_HTML_TEXT,
        identityKeyType: process.env.IDENTITY_KEY_TYPE,
        ...req.body 
      }),
      method: 'POST'
    }, function (err, response, body) {
      const jsonBody = JSON.parse(response.body)
      const responseToClient = { msgCode: jsonBody.msgCode }
      res.send(responseToClient)
      console.log('SAVE_CONSENT_INFO_PATH response to client: ', responseToClient)
    });
  });

  app.post(process.env.CUSTOMER_IDENTIFY_PATH, function(req, res) {
    request({
      headers: {
        CONTROLKEY: headersObj.CONTROLKEY,
        Authorization: headersObj.Authorization,
        "content-Type": "application/json",
      },
      uri: process.env.CUSTOMER_IDENTIFY_API_URL,
      body: JSON.stringify({
        system: process.env.SYSTEM,
        project: process.env.PROJECT,
        channel: process.env.CHANNEL,
        masterConsentCode: process.env.MASTER_CONSENT_CODE,
        identityType: process.env.IDENTITY_KEY_TYPE,
        ...req.body
      }),
      method: 'POST'
    }, function (err, response, body) {
      const jsonBody = JSON.parse(response.body)
      const responseToClient = { msgCode: jsonBody.msgCode }
      res.send(responseToClient)
      console.log('CUSTOMER_IDENTIFY_PATH response to client: ', responseToClient)
    });
  });

  app.post(process.env.OTP_REQUEST_PATH, function(req, res) {
    request({
      headers: {
        CONTROLKEY: headersObj.CONTROLKEY,
        Authorization: headersObj.Authorization,
        "content-Type": "application/json",
      },
      uri: process.env.OTP_REQUEST_API_URL,
      body: JSON.stringify({ 
        system: process.env.SYSTEM,
        project: process.env.PROJECT,
        channel: process.env.CHANNEL,
        masterConsentCode: process.env.MASTER_CONSENT_CODE,
        identityType: process.env.IDENTITY_KEY_TYPE,
        ...req.body
      }),
      method: 'POST'
    }, function (err, response, body) {
      const jsonBody = JSON.parse(response.body)
      const responseToClient = { msgCode: jsonBody.msgCode, data: { optRef: jsonBody.data?.optRef } }
      res.send(responseToClient)
      console.log('OTP_REQUEST_PATH response to client: ', responseToClient)
    });
  });

  app.post(process.env.OTP_CONFIRM_PATH, function(req, res) {
    request({
      headers: {
        CONTROLKEY: headersObj.CONTROLKEY,
        Authorization: headersObj.Authorization,
        "content-Type": "application/json",
      },
      uri: process.env.OTP_CONFIRM_API_URL,
      body: JSON.stringify({ 
        system: process.env.SYSTEM,
        project: process.env.PROJECT,
        channel: process.env.CHANNEL,
        ...req.body
      }),
      method: 'POST'
    }, function (err, response, body) {
      const jsonBody = JSON.parse(response.body)
      const responseToClient = { msgCode: jsonBody.msgCode }
      res.send(responseToClient)
      console.log('OTP_CONFIRM_PATH response to client: ', responseToClient)
    });
  });
  
  app.post(process.env.POLICY_LIST_PATH, function(req, res) {
    request({
      headers: {
        CONTROLKEY: headersObj.CONTROLKEY,
        Authorization: headersObj.Authorization,
        "content-Type": "application/json",
      },
      uri: process.env.POLICY_LIST_API_URL,
      body: JSON.stringify({ 
        system: process.env.SYSTEM,
        project: process.env.PROJECT,
        channel: process.env.CHANNEL,
        ...req.body 
      }),
      method: 'POST'
    }, function (err, response, body) {
      const jsonBody = JSON.parse(response.body)
      const responseToClient = { msgCode: jsonBody.msgCode, data: jsonBody.data }
      res.send(responseToClient)
      console.log('POLICY_LIST_PATH response to client: ', responseToClient)
    });
  });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));