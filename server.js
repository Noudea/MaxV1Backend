require('dotenv').config()
const express = require('express')
const cors = require('cors');
const router = express.Router()

const app = express()

const port = process.env.PORT || 8080


// connect to database
const mongoose = require('mongoose')

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}

// Create cached connection variable
const connection = {}
const DB_URI = process.env.DATABASE_URL

const database = async () => {
    if (connection.isConnected) {
        // use cached connection when available
        console.log('connected to cache database')
        return
    }
    try {
        const dbConnection = await mongoose.connect(DB_URI, options)
        connection.isConnected = dbConnection.connections[0].readyState
        console.log('connected to database')
    } catch (error) {
        console.error(`error connecting to db ${error.message || error}`)
    }
}

database()


//get req and res
app.use(express.json(), cors())
// res.header("Access-Control-Allow-Origin: *");
// Routes
app.use('/api', require('./routes'))
app.use('/api/test', require('./routes/test'))
app.use('/api/auth/user', require('./routes/auth/user'))
app.use('/api/auth/login', require('./routes/auth/login'))
app.use('/api/token/verify', require('./routes/token/verify'))
app.use('/api/auth/register',require('./routes/auth/register'))

// Start server listening
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


