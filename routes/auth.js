const router = require('express').Router();
const User = require('../model/User');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const {registerValidation, loginValidation}=require('../validation');

router.post('/register',async(req,res)=>{
    // Lets validate the data before we create a user
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //Check if user exist
    const emailExist= await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');
    const userNameExist= await User.findOne({username: req.body.username});
    if(userNameExist) return res.status(400).send('Username already exists');
    //Hash passwods
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt)

    //Create a new user
    const user = new User({
        name: req.body.name,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: hashPassword
    });
    //res.send('Register')
    try{
        const savedUser=await user.save();
        res.send({user: user._id});

    }catch(err){
        res.status(400).send(err);
    }

});

// LOGIN
router.post('/login',async (req,res)=>{
    // Lets validate the data before we create a user
    console.log("login");
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
        //Check if user exist
        const user = await User.findOne({username: req.body.username});
        if(!user) return res.status(400).send('Username not found!');
        const validPass= await bcrypt.compare(req.body.password, user.password);
        if(!validPass) return res.status(400).send('Invalid Password');
        //CREATE and assgin a token
        const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET)
        res.send( {username: user.username,id:user._id ,'Authorization':'bearer '+token} )

 });

module.exports= router;