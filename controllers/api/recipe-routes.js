const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Recipe, Category, User, Comment, Rating  } = require('../../models');
const withAuth = require('../../utils/auth');

var multer  = require('multer');

var upload = multer({ 
    dest: __dirname + '../../../uploads',
    fileFilter: (req, file, cb) => {
        if(file.mimetype =='image/png' || file.mimetype =="image/jpg" || file.mimetype =="image/jpeg"){
            cb(null, true);
        }
        else {
            cb('Please upload only .png, .jpg, or .jpeg files! Other formats are not allowed. Click the back arrow in your browser to return to your recipe and try again.', false);
        }
    }
});

const { uploadImage } = require('../../s3');


router.post('/', upload.single('photo-file'), async function (req, res, next) {
    // req.file is the `photo-file` file. Image to be uploaded to AWS
    // req.body will hold the text fields, if there were any
    console.log(JSON.stringify(req.file))
    console.log(JSON.stringify(req.body));

    let file;
    let result;
    let path;

    //MIGHT NOT NEED THIS HANDLING, BUT ONLY ATTEMPTS TO UPLOAD IF A FILE IS ATTACHED. SETS THE PATH TO A PLACEHOLDER IMAGE OTHERWISE
    if(req.file !== undefined){
        file = req.file;
        result = await uploadImage(file);
        path = result.Location;
    }
    else{
        path = '/images/recipe-placeholder.jpg';
    }

    // THE FOLLOWING COMMENTED CODE WOULD HAVE BEEN USED IF WE WOULD HAVE STORED IMAGES DIRECTLY ON SERVER AND SERVED FROM THERE. NOT NEEDED BECAUSE WE ARE SERVING FROM AWS
    // let array = req.file.path.toString().split('\\');
    // let path = "/" + array[array.length - 2] + "/" + array[array.length - 1];
    Recipe.create({
        title: req.body.title,
        user_id: req.session.user_id,
        category_id: req.body.categorize,
        prep_time: req.body.prepTime,
        cook_time: req.body.cookTime,
        serving_size: req.body.yieldAmt,
        ingredients: req.body.ingredients,
        directions: req.body.directions,
        image: path
    })
    .then(dbRecipeData => {
        if(dbRecipeData) res.redirect('/dashboard');
        next();
    })
    .catch(err => {
        //console.log(err.errors[0].type);
        // if(err.errors[0].type === 'Validation error'){
        //     res.statusMessage = 'Please be sure to fill in all text fields and try again.'
        //     res.status(500);
        // }
        res.status(500).json(err);
    });
});




// get all recipes
router.get('/', (req, res) => {
    Recipe.findAll({
        attributes: [
            'id',
            'title',
            'user_id',
            'image'
        ],
        order: [ ['created_at', 'DESC'] ],
        include: [
            {
                model: Category
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbRecipeData => res.json(dbRecipeData))
    .catch(err => {
        console.log(err);
        res.statusMessage = err.message;
        res.status(500);
    });
});

// get one recipe
router.get('/:id', (req, res) => {
    Recipe.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'user_id',
            'image'
        ],
        include: [
            {
                model: Category
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbRecipeData => {
        if(!dbRecipeData) {
            res.status(404).json({ message: 'No recipe found with this id' });
            return;
        }
        res.json(dbRecipeData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// update recipe | EDIT A RECIPE
router.put('/:id', withAuth, (req, res) => {
    Recipe.update(
        {
            title: req.body.title,
            user_id: req.session.user_id,
            category_id: req.body.category_id,
            prep_time: req.body.prep_time,
            cook_time: req.body.cook_time,
            serving_size: req.body.serving_size,
            ingredients: req.body.ingredients,
            directions: req.body.directions
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbRecipeData => {
        if (!dbRecipeData) {
            res.status(404).json({ message: 'No recipe with that id found' });
            return;
        }
        res.json(dbRecipeData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// delete recipe
router.delete('/:id', withAuth, (req, res) => {
    Recipe.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbRecipeData => {
        if (!dbRecipeData) {
            res.status(404).json({ message: 'No recipe with that id found' });
            return;
        }
        res.json(dbRecipeData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;