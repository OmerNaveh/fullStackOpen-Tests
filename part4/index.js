const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./router/blogRouter')
const PORT = 3003

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})