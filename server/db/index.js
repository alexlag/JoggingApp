module.exports = (mongoose, config) => {
  const database = mongoose.connection
  mongoose.Promise = Promise
  mongoose.connect(config.database, {
    useMongoClient: true,
    promiseLibrary: global.Promise
  })

  database.on('error', error => console.log(`Connection to DB failed: ${error}`))
  database.on('connected', () => console.log('Connected to DB'))
  database.on('disconnected', () => console.log('Disconnected from DB'))

  process.on('SIGINT', () => {
    database.close(() => {
      console.log('DB terminated, connection closed')
      process.exit(0)
    })
  })
}
