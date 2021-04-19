const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')
const Profile = require('../models/Profile')
const User = require('../models/User')
const { check, validationResult } = require('express-validator') 

router.get('/me', auth, async (req, res)=>{

    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', 
        ['name','avatar']);
        if(!profile){

            return res.status(400).json({ msg: 'No profile for user'}); 
            
        }

        res.json(profile) 

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Nah Nah Nah')
    }


    


});

//create or update 
router.post('/', [ auth, [
    check('status', 'what yo stt').not().isEmpty(),
   check('skills', 'show me skil').not().isEmpty()
] ], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty() ){
        return res.status(400).json({ errors: errors.array() })
    }

     const { company, website, location, status, skills, bio } = req.body; 
 
    const profileField = {}; 
    profileField.user = req.user.id; 
    if(company) profileField.company = company; 
    if(website) profileField.website = website; 
    if(location) profileField.location = location; 
    if(status) profileField.status = status; 
    if(skills) profileField.skills = skills; 
    if(bio) profileField.bio = bio; 
 
    
    try {
        
        let profile =  await Profile.findOne({ user: req.user.id })

        if(profile){
            profile = await Profile.findOneAndUpdate({ user: req. user.id }, { $set: profileField },
                {new : true})

                 return res.json(profile)
        }

        profile = new Profile(profileField);

        await profile.save()
        res.json(profile)

    } catch (error) {
        console.error(error.message);
        res.status(500).send('server sucks')
    }
    
 
    
});

router.get('/', async (req, res)=>{
try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar'])
    res.json(profiles)
} catch (error) {
    console.error(error.message).send('nonagon')
}
}) 

router.get('/user/:user_id', async (req, res)=>{
    try {
        const profile = await Profile.findOne({ user: req.params.user_id })
        .populate('user', ['name', 'avatar'])

        if(!profile){
            return res.status(400).json({
                msg: "doesnt exist"
            })
        }
        res.json(profile)
    } catch (error) {
        if(error.kind == "ObjectId"){
            return res.status(400).json({
                msg: "doesnt exist"
            })
        }
        console.error(error.message).send('nonagon')
    }
    }) 




    //delete
    router.delete('/', auth, async (req, res)=>{
        try {
            await Profile.findOneAndRemove({
                user: req.user.id
            })

            await User.findOneAndRemove({
                _id : req.user.id
            })
            res.json({ msg: "user gone ro"})
        } catch (error) {
            console.error(error.message).send('nonagon')
        }
        }) 


module.exports = router;