var cookieParser = require('cookie-parser')
var csrf = require('csurf')
var bodyParser = require('body-parser')
var express = require('express')

// setup route middlewares
var csrfProtection = csrf({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false })

// create express app
var app = express()

// parse cookies
// we need this because "cookie" is true in csrfProtection
app.use(cookieParser())

app.use(express.static(__dirname + '/public'));

app.get('/form', csrfProtection, function (req, res) {
  // pass the csrfToken to the view
  res.send({ csrfToken: req.csrfToken() })
})

app.post('/process', parseForm, csrfProtection, function (req, res) {
  res.send('data is being processed')
})


const port = 3001;

app.listen(port, () => console.log(`服务已启动，端口${port}`))