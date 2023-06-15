const express = require('express');
const pageController = require('../controllers/pageController');


const router = express.Router();

router.get('/', pageController.getIndexPage);
router.get('/services', pageController.getServicesPage);
router.get('/add', pageController.getAddPage);
router.get('/about', pageController.getAboutPage);
router.get('/team', pageController.getTeamPage);
router.get('/contact', pageController.getContactPage);


module.exports ={
    routes:router
};