const Imagemodel = require('../models/photo');
const express = require('express');
const multer=require('multer');
const mongoose = require('mongoose');
const router = express.Router();
const path=require('path');
const fs=require('fs');
//var ImageData=
router.use(express.static(__dirname+"./public/uploads"));
var Storage=multer.diskStorage({
destination:"./public/uploads/",
filename:(req,file,cb)=>{
  
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
}
});
var imgPath='/gmail.png';
var upload=multer({   
             storage:Storage}).single('file');


router.get("/",(req,res)=> {
//res.send(sucess);

res.render("fileupload.ejs");
});

router.post("/",upload,async (req,res)=> {
       
var sucess=req.file.filename+"  uploaded sucessfully";
let image=new Imagemodel({
    imagename:req.file.filename
});
/*
var newPic = new Imagemodel();
 newPic.image.data = fs.readFileSync(req.files.Imagefile.path)
 newPic.image.contentType = 'image/png';
 const image=await newPic.save();*/
image=await image.save();
//res.send(sucess);
var Image = await Imagemodel.find({});
res.render('gallery.ejs',{image:Image});
});
module.exports=router;