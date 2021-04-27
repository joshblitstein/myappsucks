const path = require('path')
const bodyParser = require('body-parser')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const method = require('method-override')
const mongoose = require('mongoose') 
const crypto = require('crypto')
const config = require('config')
const db = config.get('MongoURI')
const express = require('express')
const { write, read } = require('fs')
const JSZip = require('jszip')
const router = express.Router();





let gfs;

let conn = mongoose.createConnection(db, {useNewUrlParser: true, useUnifiedTopology: true });
conn.once('open',  () => { 
  gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads')
})

//storage engine 

const storage = new GridFsStorage({
    url: db,
    file: (req, file) => {
       return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = file.originalname //+ path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }  
  });
  const upload = multer({ storage });


  router.post('/upload', upload.array('file'),  (req, res) => {
        for(i = 0; i < req.files.length;i++){
            req.files[i].filename = i;
        }


  
        console.log(req.files[83].filename)
        res.json({file: req.file})
  })
 
  router.get('/all', (req, res)=>{
    gfs.files.find().toArray((err, files)=>{
        if(!files){
        return    res.json({
                err: 'uproad'
            })
        }
        return res.json(files)
    })
  })



  router.get('/single/:filename', (req, res)=>{
    gfs.files.findOne({ filename: req.params.filename} , (err, file) => {
        if(!file){
            return    res.json({
                    err: 'uproad'
                })
            }
            return res.json(file)
        })
    
  })


  router.get('/static/:filename', (req, res)=>{
    gfs.files.findOne({ filename: req.params.filename} , (err, file) => {
        if(!file){
            return    res.json({
                    err: 'uproad'
                })
            }
           

            if(file.contentType == 'audio/mpeg'){
                const readstream = gfs.createReadStream(file.filename);
           
                readstream.pipe(res)
            }else{
                res.json({
                    err: 'nahnah' 
                })
            }
        })
    
  })
  router.get('/audio/:user_id', (req, res)=>{

    // let user = User.find(req.params.id)
    // let myFavorites = user.UserFavorrites => returns Array  
           

    
  })






/* router.get('/random', async (req, res )=> {
  let arr = []
  let numOfFiles = 5;

  for(let i=0; i< numOfFiles; i ++){
  let num = Math.floor(Math.random() * 100)
  let myFiles = gfs.files.find({filename: `${num.toString()}.mp3`})

  
  for await (file of myFiles) {
    
    arr.push(file)
    if(file !== file){
      arr.push(file)
    }
    


  }
}


arr.forEach(file =>{
       const readstream = gfs.createReadStream(file.filename);
          console.log(file)
        res.write(readstream).catch()
   //    readstream.pipe(res.json(file))
})

  
}) */


router.get('/keep', (req, res)=>{

  let num = Math.floor(Math.random() * 100)

  gfs.files.findOne({ filename: `${num.toString()}.mp3` } , async (err, file) => {
    if(!file){
        return    res.json({
                err: 'uproad'
            })
        }
       

       if (file.contentType == 'audio/mpeg'){
            const readstream = await gfs.createReadStream(file.filename);
          console.log(readstream)
          await  readstream.pipe(res)
        }else{
            res.json({
                err: 'nahnah' 
            })
        }
    })
})

router.get('/static/:filename/zip', (req, res)=>{
  gfs.files.findOne({ filename: req.params.filename} , (err, file) => {
      if(!file){
          return    res.json({
                  err: 'uproad'
              })
          }
         
           
          if(file.contentType == 'audio/mpeg'){
              const readstream = gfs.createReadStream(file.filename);
       //  console.log(readstream)
              readstream.pipe(res)
          }else{
              res.json({
                  err: 'nahnah' 
              })
          }
      })
  
})





  module.exports = router;
 
//for lop

// remember - (when a new user registers, create them a UserFavorite with their ID ( user has one UserFavoite), set their favorites to an empty [] )

// 1. '/Random' route => gfs.files grabs 5 random files from DB
// send that array of files to the frontend

// - √ gets rid of mapping number array and new req each time to get audi src

// 2. Frontend -> save = creates array in frontend of FILES

// 3. create POST req route, we send the array of files 
// -  user = UserFavorite.find(user_id)  => update their array with 
// user.UserFavorites = req.body.favorites


