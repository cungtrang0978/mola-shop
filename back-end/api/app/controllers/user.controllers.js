const User = require('../models/user.model')
const customId = require("custom-id")
const bcrypt = require('bcryptjs')
const helper = require('../../helper')
var cloudinary = require('cloudinary').v2
cloudinary.config({ 
    cloud_name: 'dwgsm5xpa', 
    api_key: '881558854155541', 
    api_secret: '23CjV9_qVzLeH5Q7jXNLtryzZiQ' 
});


// Create new user
exports.create = async (req, res) => {
    //Validate
    if (!req.body) {
        res.status(400).send({
            data: { message: "Content cant empty!" },
            result: { code: 1, message: 'Error!' }
        })
    }
    // Create
    const user = new User({
        id_user : customId({}),
        email : req.body.email,
        loginname : req.body.loginname,
        username : req.body.username ? req.body.username : '',
        address : req.body.address ? req.body.address : '',
        citizen_identification : req.body.citizen_identification ? req.body.citizen_identification : null,
        phone_number : req.body.phone_number ? req.body.phone_number : null,
        gender : req.body.gender,
        userpassword : await bcrypt.hash(req.body.userpassword, 10),
        acc_created : new Date(),
        avatar : req.body.avatar ?  req.body.avatar : '',
        rate : req.body.rate ? req.body.rate : null,
        last_login: new Date(),
        birthday: ''
    })

    
    //Save user
    User.create(user, (err, data) => {
        if (err) {
            res.status(400).send({
                data: {  message:  err.message || "Some error occurred." },
                result: { code: 1, message: 'Error!' }
            })
        }
        else {
            res.send({data, result: { code: 0, message: 'OK' }})
        }
    })
}

//Fetch user
exports.fetchUser = async (req, res) => {
    User.fetchUser(res.user,(err, data) => {
        if (err) {
            res.status(400).send({
                data: { message:  err.message || "Token was not valid!" },
                result: { code: 1, message: 'Error!' }
            })
        }
        else {
            res.send({data, result: { code: 0, message: 'OK' }})
        }
    })
}

//Update user
exports.update = (req, res) => {
    //Validate
    if (!req.body) {
        res.status(400).send({
            data: { message: "Content cant empty!"},
            result: { code: 1, message: 'Error!' }
        })
    }
    
    // Create
    var user = {
        email : req.body.email,
        username : req.body.username,
        address : req.body.address ? req.body.address : '',
        citizen_identification : req.body.citizen_identification ? req.body.citizen_identification : null,
        phone_number : req.body.phone_number ? req.body.phone_number : null,
        gender : req.body.gender,
        avatar : req.body.avatar ?  req.body.avatar : '',
        rate : req.body.rate ? req.body.rate : null,
        birthday: req.body.birthday ?  req.body.birthday : '',
    }
    User.update(helper.clearBlankObject({user, id: res.user}), (err, data) => {
        if (err) {
            res.status(500).send({
                data: { message:  err.message || "Some error occurred!" },
                result: { code: 1, message: 'Error!' }
            })
        }
        else {
            res.send({data, result: { code: 0, message: 'OK' }})
        }
    })
}

exports.uploadImage = async (req, res) => {
    try {
        var link = ''
        await cloudinary.uploader.upload((`./uploads/${req.file.filename}`), function(error, result) {
            if (error) {
                return res.status(500).send({
                    data: { message:  err.message || "Some error occurred!" },
                    result: { code: 1, message: 'Error!' }
                });
            }
            link = result.url
        });
        await User.updateAvatar({link: link, id: res.user}, (err, data) => {
            return  res.send({data, result: { code: 0, message: 'OK' }})
        })
    } catch (error) {
       if (error) {
            return res.status(500).send({
                data: { message:  err.message || "Some error occurred!" },
                result: { code: 1, message: 'Error!' }
            })
        }
    }
}

exports.changePassword = async (req, res) => {
    try {
        const payload = {
            user: res.user,
            currPassword: req.body.userpassword,
            newPassword: req.body.newpassword
        }
        User.changePassword(payload, (err, data) => {
            if (err) {
                res.status(400).send({
                    data: { message:  err.message || "Something wrong!" },
                    result: { code: 1, message: 'Error!' }
                })
            }
            else {
                res.send({data, result: { code: 0, message: 'OK' }})
            }
        })
    }
    catch (error) {
        if (error) {
             return res.status(500).send({
                 data: { message:  err.message || "Some error occurred!" },
                 result: { code: 1, message: 'Error!' }
             })
         }
     }
}