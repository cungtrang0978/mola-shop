const express = require('express');
const router = express.Router();
const multer  = require('multer');
const streamifier = require('streamifier')
var path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
  });
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });

const User = require('../controllers/user.controllers')
const middleware = require('../middleware/user.middleware')

router.post('/user', User.create)
router.get('/user', middleware.isLogged, User.fetchUser)
router.post('/update-user',middleware.isLogged, User.update)
router.post('/upload-avatar', middleware.isLogged ,upload.single('image'), User.uploadImage)
router.post('/change-password', middleware.isLogged, User.changePassword)


router.get('/test', (req, res) => {
    res.status(200).send({
        message: 'test'
    })
})
module.exports = router;