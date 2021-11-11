const express = require('express');
const photoController = require('./photoController');

const router = express.Router();

router
  .route('/photos')
  .get(photoController.getPhotos);

router
  .route('/photos/:id')
  .get(photoController.getPhotoById);

module.exports = router;
