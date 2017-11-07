const webpack = require('webpack')
const apiPort = require('./server/config.js').port

module.exports = {
  presets: [
    require('poi-preset-react')()
  ],
  webpack (config) {
    config.plugins.push(new webpack.ContextReplacementPlugin(
      /moment[\/\\]locale$/,
      /en/)
    )
    return config
  },

  devServer: {
    proxy: {
      '/api': {
        target: `http://localhost:${apiPort}`,
        pathRewrite: {'^/api': ''}
      }
    }
  }
}
