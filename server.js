const express = require('express');
const request = require('request');
const querystring = require('querystring');
const path = require('path');

const app = express();
const bodyParser = require('body-parser');

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

app.post('/login/token', (req, res) => {
  request.post({ url: 'https://authorization1.navakij.co.th/authorization-api-1.0.0/login/token', form: req.body}).pipe(res);  
})

app.get('/consent/checkisconsent', function(req, res) {
    request({
      headers: {
        CONTROLKEY: req.headers['controlkey'],
        Authorization: req.headers['authorization'],
        "content-Type": "application/json",
      },
      uri: 'https://uat-web.navakij.co.th/consentmanager-api-1.0.0/consent/checkisconsent',
      body: JSON.stringify(req.query),
      method: 'GET'
    }, function (err, response, body) {
      //it works!
      res.send(response.body)
    });
});

app.get('/consent/getmasterconsent', function(req, res) {
    request({
      headers: {
        CONTROLKEY: req.headers['controlkey'],
        Authorization: req.headers['authorization'],
        "content-Type": "application/json",
      },
      uri: 'https://uat-web.navakij.co.th/consentmanager-api-1.0.0/consent/getmasterconsent',
      body: JSON.stringify(req.query),
      method: 'GET'
    }, function (err, response, body) {
      //it works!
      res.send(response.body)
    });
  });
  
  app.post('/consent/saveconsentinfo', function(req, res) {
    console.log('***********')
    console.log('red.boy-------: ', req.body)
    console.log('***********')
    request({
      headers: {
        CONTROLKEY: req.headers['controlkey'],
        Authorization: req.headers['authorization'],
        "content-Type": "application/json",
      },
      uri: 'https://uat-web.navakij.co.th/consentmanager-api-1.0.0/consent/saveconsentinfo',
      body: JSON.stringify(req.body),
      method: 'POST'
    }, function (err, response, body) {
      //it works!
      console.log("response.body: ",response.body)
      res.send(response.body)
    });
  });

  app.post('/api/customer/identifying', function(req, res) {
    request({
      headers: {
        CONTROLKEY: req.headers['controlkey'],
        Authorization: req.headers['authorization'],
        "content-Type": "application/json",
      },
      uri: 'https://uat-web.navakij.co.th/myinformation-api-1.0.0/api/customer/identifying',
      body: JSON.stringify(req.body),
      method: 'POST'
    }, function (err, response, body) {
      //it works!
      console.log("response.body: ",response.body)
      res.send(response.body)
    });
  });

  app.post('/api/customer/otp/request', function(req, res) {
    request({
      headers: {
        CONTROLKEY: req.headers['controlkey'],
        Authorization: req.headers['authorization'],
        "content-Type": "application/json",
      },
      uri: 'https://uat-web.navakij.co.th/myinformation-api-1.0.0/api/customer/otp/request',
      body: JSON.stringify(req.body),
      method: 'POST'
    }, function (err, response, body) {
      //it works!
      console.log("response.body: ",response.body)
      res.send(response.body)
    });
  });

  app.post('/api/customer/otp/confirm', function(req, res) {
    request({
      headers: {
        CONTROLKEY: req.headers['controlkey'],
        Authorization: req.headers['authorization'],
        "content-Type": "application/json",
      },
      uri: 'https://uat-web.navakij.co.th/myinformation-api-1.0.0/api/customer/otp/confirm',
      body: JSON.stringify(req.body),
      method: 'POST'
    }, function (err, response, body) {
      //it works!
      console.log("response.body: ",response.body)
      res.send(response.body)
    });
  });

  app.post('/api/mypolicy/list', function(req, res) {
    request({
      headers: {
        CONTROLKEY: req.headers['controlkey'],
        Authorization: req.headers['authorization'],
        "content-Type": "application/json",
      },
      uri: 'https://uat-web.navakij.co.th/myinformation-api-1.0.0/api/mypolicy/list',
      body: JSON.stringify(req.body),
      method: 'POST'
    }, function (err, response, body) {
      //it works!
      console.log("response.body: ",response.body)
      res.send(response.body)
    });
  });



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));