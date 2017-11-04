module.exports = {
  port: process.env.PORT || 3000,
  secret: process.env.SECRET || 'Secret',
  mongo: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/jogging'
}
