const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
//const config = require('config');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


///when we start with loalhost:4000/api/users 

router.get('/',async(req,res)=>{
res.render("signinform.ejs");
//
})
    
///////after login and conformation of authtoken
router.get('/me',auth, async (req, res) => {
   const user =User.findById(req.user._id).select('-password')
    res.render('details.ejs');  //////pages goes to detail page
});
///// this is for logout afetr that cookie token will be deleted 
router.get('/logout',async(req,res)=>{
  res.clearCookie('auth-token');
  res.render("index.ejs");
})

router.post('/',async (req, res) => {
  
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');
   user = new User(_.pick(req.body, ['name', 'email','password']));
  const salt = await bcrypt.genSalt(10);                           ///we bcrypt the password for making strong password
  user.password = await bcrypt.hash(user.password, salt);
   user= await user.save();
  ///res.send("new user created");
 //res.redirect('/api/login');
 res.render("projects.ejs"); 
});
module.exports = router; 
