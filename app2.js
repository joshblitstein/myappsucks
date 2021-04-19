const express = require("express")
const connectDB = require('./config/db')


const app = express();
const cors = require('cors')
const fs = require('fs')
app.use(cors())

const port = process.env.PORT || 5000;


//body parse
app.use(express.json({ extended: false })) 

connectDB();
app.use('/test', express.static(__dirname + '/Ambeint Voltages'));

app.use('/users', require('./routes/users'))
app.use('/auth', require('./routes/auth'))
app.use('/posts', require('./routes/posts'))
app.use('/profile', require('./routes/profile'))

/* app.get("/usersw", (req, res)=>{
    res.json()
})
 */


app.listen(port, () =>{
    console.log(`hey port ${port}`)
})