const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors())

const port = 4000;


app.get('/files', (req, res) => {
    res.sendFile(files[num], {root : '.'})
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

let num  =  Math.floor(Math.random() * files.length);
console.log(files[num])

//console.log(files)
module.exports = files;
