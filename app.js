require('dotenv').config()
const express = require("express")
const app = express()
const cors = require("cors")
const User = require('./models/list')
const mongoose = require("mongoose")
// const port = process.env.PORT || 3001;
app.use(cors({
    origin:"*",
})
)
mongoose.connect(process.env.DB_connect)
const db = mongoose.connection
db.on('error',(error)=> console.error(error))
db.once('open',() =>console.log('Ket noi thanh cong'))


app.use(express.json())

const router = require('./Router/router')
app.use('/list',router)
// localhost:3001/list

app.listen(3001,()=>{
    console.log('Start server')
})