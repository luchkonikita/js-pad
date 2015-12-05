const express = require('express')
const app = express()

app.set('port', (process.env.PORT || 5000))

app.use('/public', express.static('public'))

// views is directory for all template files
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.locals = require('./helpers/index')

app.get('/', (request, response) => {
  response.render('pages/index')
})

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'))
})
