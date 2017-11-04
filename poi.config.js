const apiPort = require('./server/config.js').port

module.exports = {
  presets: [
    require('poi-preset-react')()
  ],
  devServer: {
    proxy: {
      '/api': {
        target: `http://localhost:${apiPort}`,
        pathRewrite: {'^/api': ''}
      }
    }
  }
}
