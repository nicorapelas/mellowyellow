const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
  app.use(
    [
      '/api',
      '/api/user',
      '/api/order',
      '/api/order/hq',
      '/api/validate',
      '/api/enquirey',
    ],
    createProxyMiddleware({
      target: 'http://localhost:5000',
    })
  )
}
