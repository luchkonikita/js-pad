const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const passport = require('passport')
const passportConfig = require('./config/passport')
const actions = require('./actions/index')
const helpers = require('./helpers/index')
const User = require('./models/user')

const app = express()

passportConfig(passport)

app.set('port', (process.env.PORT || 5000))
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

app.use(methodOverride('_method'))
app.use(session({secret: 'goingtokickyourass'}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use('/public', express.static('public'))

app.locals = helpers

app.get('/', actions.home)
app.get('/pad', actions.checkLogin, actions.pad)
app.get('/auth/github', actions.auth)
app.get('/auth/github/callback', actions.authCallback)
app.delete('/logout', actions.logout)

// sync DB before running the application
User.sync().then(() => {
  app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'))
  })
})
