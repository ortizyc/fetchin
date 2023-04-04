import { resolve } from 'node:path'

import cors from 'cors'
import express from 'express'

const app = express()
app.use(cors())
app.listen(9999, () => console.log('Server running on port 9999'))

function standardResponseBody(code = 200, message = 'ok', data: any = null) {
  return {
    code,
    message,
    data,
  }
}

app.get('/standard/greet', (req, res) => {
  return res.json(standardResponseBody(200, 'ok', 'Hello World!'))
})
app.get('/standard/requiredLogin', (req, res) => {
  return res.json(standardResponseBody(401, 'required login'))
})
app.get('/image', (req, res) => {
  return res.sendFile(resolve(__dirname, '../../../docs/logo.png'))
})

function nonstandardResponseBody(code = 200, message = 'ok', data: any = null) {
  return {
    status: code,
    msg: message,
    result: data,
  }
}

app.get('/nonstandard/greet', (req, res) => {
  return res.json(nonstandardResponseBody(200, 'ok', 'Hello World!'))
})
app.get('/nonstandard/requiredLogin', (req, res) => {
  return res.json(nonstandardResponseBody(401, 'required login'))
})
