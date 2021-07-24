const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Recipe, Image } = require('../../models');
const withAuth = require('../../utils/auth');
const { uploadImage } = require('../../s3');

var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

router.get('/:key', (req, res) => {
    const image_key = req.params.key;
    
})

router.post('/', withAuth, upload.single('image'), async (req, res) => {
     
    
    Image.create({
         id: req.params.id,
         image_key: req.params.image_key,
         recipe_id: req.params.recipe_id
     })    
     .then(dbImageData => res.json(dbImageData))
     .catch(err => {
         console.log(err);
         res.status(500).json(err);
     });
});