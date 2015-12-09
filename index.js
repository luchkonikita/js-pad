const express = require('express')
const app = express()
const actions = require('./actions/index')
const helpers = require('./helpers/index')

app.set('port', (process.env.PORT || 5000))

app.use('/public', express.static('public'))

// views is directory for all template files
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.locals = helpers

app.get('/', actions.home)
app.get('/auth/github', actions.github)
app.get('/auth/github/callback', actions.githubCallback)

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'))
})
