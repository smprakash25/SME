const Joi = require('joi');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const {User,userSchema} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
  res.render('login.ejs');
})
router.post('/', async (req, res) => {
  ////const { error } = validate(req.body); 
  //if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  //res.send(true);
 const token = userSchema.methods.generateAuthToken(user);
 console.log(token);
res.cookie('auth-token',token).redirect('/api/users/me')

  //res.send(token);
});

function validate(req) {
  const schema = {
  ///  email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(req, schema);
}

module.exports = router; 
