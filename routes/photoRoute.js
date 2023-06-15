const express = require('express');
const photoController = require('../controllers/photoController');


const router = express.Router();

router.post('/', photoController.createPhoto);
router.get('/', photoController.getAllPhotos);
router.get('/edit/:id', photoController.getEditPage);
router.put('/:id', photoController.updatePhoto);
router.delete('/:id', photoController.deletePhoto);



module.exports ={
    routes:router
};