const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors())

const port = 4000;


app.get('/files', (req, res) => {
    res.json(files)
  })
  

app.listen(port, () =>{
    console.log(`hey port ${port}`)
})




const fs = require("fs");
let files = []
let arrayOfFiles = fs.readdirSync("Ambeint Voltages");

arrayOfFiles.forEach(f  =>{
    files.push(f)
})


console.log(files)
module.exports = files;
