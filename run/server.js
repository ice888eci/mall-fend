const express = require('express')

const app = express()

app.use(express.static('./'))

app.listen(803, () => {
  console.log('start 803')
})
