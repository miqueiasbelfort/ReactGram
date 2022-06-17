const express = require("express")
const path = require("path")
const cors = require("cors")

require("dotenv").config()

const port = 5000
const app = express()

//config JSON and form data response
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//solve CORS
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

//upload directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// DB connecttion
require("./config/db.js")

//routes
const router = require("./routes/Router")
app.use(router)

app.listen(process.env.PORT || port, () => {
    console.log("Server is running!")
})