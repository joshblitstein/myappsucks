const express = require("express")
const connectDB = require('./config/db')
const path = require('path')

const app = express();
const cors = require('cors')
const fs = require('fs')
app.use(cors())

const port = process.env.PORT || 5000;


//body parses
app.use(express.json({ extended: false }))  

connectDB();
app.use('/test', express.static(__dirname + '/Ambeint Voltages'));
app.use('/te', express.static('application-0-xwxuu/Audio/'));

app.use('/users', require('./routes/users'))
app.use('/auth', require('./routes/auth')) 
app.use('/posts', require('./routes/posts'))
app.use('/profile', require('./routes/profile'))
app.use('/hi', require('./config/grid'))









/* app.get("/usersw", (req, res)=>{
    res.json()
})
 */



//for loop name genrator





















app.listen(port, () =>{
    console.log(`hey port ${port}`)
})
