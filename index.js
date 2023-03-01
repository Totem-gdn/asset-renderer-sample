'use strict'

require('dotenv').config()

const express     = require('express'),
      app         = express(),
      server      = require('http').createServer(app),
      bodyParser  = require('body-parser'),
      cors        = require('cors'),
      queue       = require('express-queue');


// потрібно для ліміту по запитах на сервер, тому що бібліотеки для рендереру растрових зоображень сильно прожорліві, 
// і ми додаємо чергу з одним активним запитом щоб не було помилки по памяті
app.use(queue({ activeLimit: 1, queuedLimit: -1 }));

app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())



app.use('/', require('./routes/index'))
app.use('/resources',express.static('./resources'))

const host = process.env.host || '0.0.0.0'
const port = process.env.port || 3000

server.listen(port, host, () => {
  console.log(`Express server available at http://${host}:${port}`)
})
