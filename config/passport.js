const GithubStrategy = require('passport-github2').Strategy
const User = require('../models/user')

const strategyOptions = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_REDIRECT_URL
}

module.exports = (passport) => {

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User
      .findById(id)
      .then((user) => {
        done(null, user.get({plain: true}))
      })
  })

  passport.use('github', new GithubStrategy(strategyOptions, (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
      User.findOrCreate({
        where: {
          githubId: profile.id
        },
        defaults: {
          githubLogin: profile.login,
          githubAvatarUrl: profile.avatar_url,
          email: profile.email
        }
      }).spread((createdUser) => {
        return done(null, createdUser.get({plain: true}))
      })
    })
  }))
}
