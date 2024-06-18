// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/homepage',
    createProxyMiddleware({
      target: 'http://homepage-service', // Kubernetes service name for HomePage
      changeOrigin: true,
      pathRewrite: { '^/api/homepage': '/' },
    })
  );
  app.use(
    '/api/aboutpage',
    createProxyMiddleware({
      target: 'http://aboutpage-service', // Kubernetes service name for AboutPage
      changeOrigin: true,
      pathRewrite: { '^/api/aboutpage': '/' },
    })
  );
  app.use(
    '/api/contactpage',
    createProxyMiddleware({
      target: 'http://contactpage-service', // Kubernetes service name for ContactPage
      changeOrigin: true,
      pathRewrite: { '^/api/contactpage': '/' },
    })
  );
  app.use(
    '/api/listservice',
    createProxyMiddleware({
      target: 'http://listservice-service', // Kubernetes service name for ListService
      changeOrigin: true,
      pathRewrite: { '^/api/listservice': '/' },
    })
  );
};
