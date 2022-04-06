const express = require('express');
const request = require('request');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
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
    res.send(response.body)
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
      body: JSON.stringify(req.query),
      method: 'GET'
    }, function (err, response, body) {
      res.send(response.body)
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
      body: JSON.stringify(req.query),
      method: 'GET'
    }, function (err, response, body) {
      res.send(response.body)
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
      body: JSON.stringify(req.body),
      method: 'POST'
    }, function (err, response, body) {
      res.send(response.body)
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
      body: JSON.stringify(req.body),
      method: 'POST'
    }, function (err, response, body) {
      res.send(response.body)
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
      body: JSON.stringify(req.body),
      method: 'POST'
    }, function (err, response, body) {
      res.send(response.body)
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
      body: JSON.stringify(req.body),
      method: 'POST'
    }, function (err, response, body) {
      res.send(response.body)
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
      body: JSON.stringify(req.body),
      method: 'POST'
    }, function (err, response, body) {
      res.send(response.body)
    });
  });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));