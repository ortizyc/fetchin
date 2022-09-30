import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.json({ code: 200, message: 'OK', data: 'hello' })
})

app.listen(9999, () => console.log('Server running on port 9999'))
