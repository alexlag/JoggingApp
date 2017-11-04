const http = require('http')

const port = require('./config.js').port
const api = require('./api.js')

const server = http.Server(api)

server.listen(port, '0.0.0.0', () => console.log(`BudgetManagerAPI running on ${port}`))
