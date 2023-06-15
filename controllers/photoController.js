const Photo = require("../models/Photo");
const fs = require("fs");

const createPhoto = async (req, res) => {
  try {
    let uploadDir = "public/uploads";

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    let uploadImage = req.files.image;
   
    let uploadPath = __dirname + "/../public/uploads/" + uploadImage.name;
    console.log(req.body);
    
    uploadImage.mv(uploadPath, async () => {
      await Photo.create({
        ...req.body,
        image: "/uploads/" + uploadImage.name,
      });
      res.redirect("/");
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

const getAllPhotos = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const photosPerPage = 6;
    const totalPhotos = await Photo.find().countDocuments(); // document deki total data sayısı
  
    const photos = await Photo.find({})
      .sort('-createdAt')
      .skip((page - 1) * photosPerPage)
      .limit(photosPerPage);
  
    res.render('index', {
      photos: photos,
      current: page,
      pages: Math.ceil(totalPhotos / photosPerPage),
    });
    
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error
    });
  }

};

const getEditPage = async (req, res) => {

  const photo = await Photo.findById({_id:req.params.id});
  res.render('edit', {
    photo:photo

  });
};

const updatePhoto = async (req, res) => {
try {
  const photo = await Photo.findOne({_id:req.params.id});
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();
  
 res.redirect('/');
  
} catch (error) {
  res.status(400).json({
    status: 'fail',
    error,
  });
}

};

const deletePhoto = async (req, res) => {
  try {
    const photo = await Photo.findOne({_id:req.params.id});
    let deletedImage =  __dirname + "/../public" + photo.image;

    if(fs.existsSync(deletedImage)){
      fs.unlinkSync(deletedImage); // localdeki pathden dosyayı siler
    }
    await Photo.findByIdAndRemove(req.params.id);
   res.redirect('/');
    
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
  
  };



module.exports = {
  createPhoto,
  getAllPhotos,
  getEditPage,
  updatePhoto,
  deletePhoto
};
