const {createProxyMiddleware } = require('http-proxy-middleware')

module.exports = app => {
  app.use(
    createProxyMiddleware('/v2/bot/message/push',
    {
      target: 'https://api.line.me',
      changeOrigin: true
    })
  )
}