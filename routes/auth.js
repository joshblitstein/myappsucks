const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
 
const config = require('config')



router.get('/auth', auth, async (req, res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
res.send("sup auth")
});

 
router.post('/auth', [
   
    check('email', 'include email').isEmail(),
    check('password', 'password please').exists()
], async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }
    console.log(req.body)

        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email })
            if(!user){
                res.status(400).json({ errors: [{ msg: 'Invalid Credentials'}] })
            }
      
         
            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch){
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials'}]} )
            }
          
      
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 3600}, (err, token)=>{
                if(err) throw err;
                res.json({ token })
            } )
      
           // res.send("Okee")
        } catch (error) {
            console.log(error.message)
            res.status(500).send('Server Error')
        }







});


module.exports = router;