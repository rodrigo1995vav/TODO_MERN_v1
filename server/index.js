const tasks = require("./routes/tasks")
const connection = require('./db')
const cors = require("cors")
const express = require('express')
require('dotenv').config()

const app = express()

connection()

app.use(express.json())
app.use(cors())

app.use("/api/tasks", tasks)

const port  = process.env.PORT || 3001

app.listen(port, ()=>console.log(`Listening on port ${port}`))