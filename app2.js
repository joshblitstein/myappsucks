const express = require("express")
const app = express();
const cors = require('cors')
const fs = require('fs')
app.use(cors())
const path = "8.mp3"
const port = 5000;
const word = "ass"


 //const read = fs.readFileSync(path)
//console.log(read)
app.get('/link', (req, res) => {
res.sendFile(path)
})


app.listen(port, () =>{
    console.log(`hey port ${port}`)
})