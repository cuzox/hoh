// Get dependencies
const express = require('express')
const path = require('path')
const http = require('http')
var cors = require('cors')
const bodyParser = require('body-parser')
var config = require('./server/config')
var passport = require('passport')
var hookJWTStrategy = require('./server/services/passport-jwt.service')

const app = express()
var router = express.Router()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Hook up passport
app.use(passport.initialize())
hookJWTStrategy(passport)

// Setup dist
app.use(express.static(path.join(__dirname, 'dist')))

// Setup API
app.use('/api', require('./server/routes/api')(passport))

// Setup static images
let imgExt = ['jpg','JPG','png','PNG','jpeg','JPEG']
app.use('/static/images', express.static(path.join(__dirname, config.imagePath), { index:false, extensions: imgExt }))

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

// Get port from environment and store in Express
const port = process.env.NODE_ENV === 'production' ? 8080 : 3000
app.set('port', port)

// Create HTTP server
const server = http.createServer(app)

// Listen on provided port, on all network interfaces
server.listen(port, () => console.log(`API running on localhost:${port}`))