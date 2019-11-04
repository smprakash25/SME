const mongoose=require('mongoose');

const ImageSchema = new mongoose.Schema({
  imagename: String
});
/*var schema = new mongoose.Schema({
    image: { data: Buffer, contentType: String }
});*/

module.exports = mongoose.model('Image', ImageSchema);
//module.exports = mongoose.model('Imagefile', schema);