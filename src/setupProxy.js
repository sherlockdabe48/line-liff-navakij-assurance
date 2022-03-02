const createProxyMiddleware = require('http-proxy-middleware')

module.exports = app => {
  app.use(
    createProxyMiddleware('/consent/checkisconsent',
    {
      target: 'https://uat-web.navakij.co.th/consentmanager-api-1.0.0',
      changeOrigin: true,
      onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      }
    })
    )
    app.use(
      createProxyMiddleware('consent/getmasterconsent/',
      {
        target: 'https://uat-web.navakij.co.th/consentmanager-api-1.0.0',
        changeOrigin: true,
        onProxyRes: function (proxyRes, req, res) {
          proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        }
    })
  )
}