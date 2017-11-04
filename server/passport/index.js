const PassportJWT = require('passport-jwt')
const config = require('../config.js')
const User = require('../models/user.js').default

const ExtractJWT = PassportJWT.ExtractJwt
const Strategy = PassportJWT.Strategy

module.exports = (passport) => {
  const parameters = {
    secretOrKey: config.secret,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
  }

  passport.use(new Strategy(parameters, (payload, done) => {
    User.findOne({ id: payload.id }, (error, user) => {
      if (error) return done(error, false)
      if (user) done(null, user)
      else done(null, false)
    })
  }))
}
