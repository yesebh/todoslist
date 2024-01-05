const auth = require('../middlewear/auth');

const jwt=require('jsonwebtoken');
const config=require('config');
const bcrypt=require('bcrypt');
const _= require('lodash');

const {User, validate}=require('../model/user');

const mongoose=require('mongoose');
const express= require('express');


const router=express.Router();

router.get('/me', auth, async (req, res)=>{
    const user= await user.findById(req.user.id).select('-password');
    res.send(user);
});

router.post('/', async(req, res)=>{
    const {error}= validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user=await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('user already exists');
    user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password

    });
    const salt= await bcrypt.genSalt(10);
    user.password=await bcrypt.hash(user.password, salt);
    await user.save()
    const token=user.generateAuthToken();
    //const token = jwt.sign({ _id: user._id}, config.get('jwtprivatekey'));
    res.header('x-auth-token',token).send(_.pick(user, ['_id','name', 'email']));
    
    
});

module.exports=router;