const express = require('express')

const app = express()

app.set('port', (process.env.PORT || 5000))
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

app.use('/public', express.static('public'))

app.locals = require('./helpers/index')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'))
})

