const express = require('express')
const router = express.Router();

router.get('/posts', (req, res)=>{
res.send("sup posts")
});

module.exports = router;