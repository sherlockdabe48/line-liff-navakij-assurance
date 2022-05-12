const { createProxyMiddleware } = require('http-proxy-middleware');

const AUTHEN_PATH = "/login/token"
const CHECK_IS_CONSENT_PATH = "/consent/checkisconsent"
const GET_MASTER_CONSENT_PATH = "/consent/getmasterconsent"
const SAVE_CONSENT_INFO_PATH = "/consent/saveconsentinfo"
const CUSTOMER_IDENTIFY_PATH = "/api/customer/identifying"
const OTP_REQUEST_PATH = "/api/customer/otp/request"
const OTP_CONFIRM_PATH = "/api/customer/otp/confirm"
const POLICY_LIST_PATH = "/api/mypolicy/list"

module.exports = function(app) {
  app.use(
    AUTHEN_PATH,
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
  app.use(
    CHECK_IS_CONSENT_PATH,
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
  app.use(
    GET_MASTER_CONSENT_PATH,
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
  app.use(
    SAVE_CONSENT_INFO_PATH,
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
  app.use(
    CUSTOMER_IDENTIFY_PATH,
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
  app.use(
    OTP_REQUEST_PATH,
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
  app.use(
    OTP_CONFIRM_PATH,
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
  app.use(
    POLICY_LIST_PATH,
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
};