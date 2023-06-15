const Photo = require('../models/Photo');

const getIndexPage = async (req, res) => {

  const totalPhotos = await Photo.find().countDocuments(); // document deki total data sayısı

  const photos = await Photo.find({})
    .sort('-createdAt')

  res.status(200).render('index', {
    photos: photos,
  });
};

const getServicesPage = (req, res) => {
  res.status(200).render("services");
};

const getAddPage = (req, res) => {
  res.status(200).render("add");
};

const getAboutPage = (req, res) => {
  res.status(200).render("about");
};

const getTeamPage = (req, res) => {
  res.status(200).render("team");
};

const getContactPage = (req, res) => {
  res.status(200).render("contact");
};

module.exports = {
  getIndexPage,
  getServicesPage,
  getAddPage,
  getAboutPage,
  getTeamPage,
  getContactPage,
};
