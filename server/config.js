module.exports = {
  secret: process.env.SECRET || 'Secret',
  mongo: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/jogging'
}
