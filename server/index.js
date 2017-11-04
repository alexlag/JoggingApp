const http = require('http')

const port = require('./config.js').port
const api = require('./api/index.js')

const server = http.Server(api)

server.listen(port, '0.0.0.0', () => console.log(`API running on ${port}`))
