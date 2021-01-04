var express = require('express');
var galleryRouter = express.Router();

var router = function(title) {

    var galleryController = require('../controllers/galleryController')(title);

    galleryRouter.route('/')
        .get(galleryController.listGalleryDocs);
    return galleryRouter;

};
module.exports = router;
