const express = require("express")
const app = express();
const cors = require('cors')
const fs = require('fs')
app.use(cors())
const path = "13.mp3"
const path2 = "8.mp3"
const pathTry = "Ambeint Voltages\2.mp3"
const port = 5000;

console.log(__dirname)
app.use('/test', express.static(__dirname + '/Ambeint Voltages'));
 //const read = fs.readFileSync(path)
//console.log(read)
app.get('/link', (req, res) => {
res.sendFile(path, {root : '.'})
})


app.listen(port, () =>{
    console.log(`hey port ${port}`)
})