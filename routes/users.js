const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')



router.post('/user', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'include email').isEmail(),
    check('password', 'please enter password more than 6 characters').isLength({ min: 6 }),

    
], async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }
    console.log(req.body)

        const { name, email, password } = req.body;
        try {

            // see if user exists
            //.findone scans through DB
            let user = await User.findOne({ email })
            if(user){
                res.status(400).json({ errors: [{ msg: 'User already exists'}] })
            }
       
            //get Gravatar
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'PG',
                d: 'MM'
            })

           
           
            /* creates new user instance.. doesnt save i. e sets all 
            values to schema and creates new insnance  */
            user = new User({
                name,
                email,
                avatar,
                password,
                
                
            });

            //encrypts password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            //saves to DB
            await user.save();
            

            //jwt
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 3600}, (err, token)=>{
                if(err) throw err;
                res.json({ token })
            } )
      
            //res.send("registrd bruh")
        } catch (error) {
            console.log(error.message)
            res.status(500).send('Server Error')
        }




//res.send(":hi")



});

module.exports = router;  