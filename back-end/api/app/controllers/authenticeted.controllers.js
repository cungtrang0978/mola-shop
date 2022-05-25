const Authenticated = require('../models/authenticated.model')
const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const customId = require("custom-id")

var nodemailer = require('nodemailer');

exports.login = (req, res) => {
    if (req.body) {
        const userLogin = {
            loginname: req.body.loginname,
            userpassword: req.body.userpassword
        };
        Authenticated.login(userLogin, (err, data) => {
            console.log('vo dc day final')
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
}

exports.forgotPassword = (req, res) => {
    //Validate
    if (!req.body) {
        res.status(400).send({
            data: { message: "Content cant empty!" },
            result: { code: 1, message: 'Error!' }
        })
    }

    User.getInforWithEmail(req.body.email, async (err, data) => {
        try {
            if (data[0]) {
                const newPassword = await customId({ randomLength: 4})
                const newPasswordHash = await bcrypt.hash(newPassword, 10);
                var userInfo = data[0]
                await User.update({user: {userpassword: newPasswordHash}, id: data[0].id_user}, async (err, data) => {
                    if (err) {
                        res.status(400).send({
                            data: { message:  err.message || "Something wrong!" },
                            result: { code: 1, message: 'Error!' }
                        })
                    }
                    var transporter = await nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                          user: 'huu.van.23tg@gmail.com',
                          pass: 'tauaqedjbxitlwps'
                        }
                    });
                      
                    var mailOptions = {
                        from: 'huu.van.23tg@gmail.com',
                        to: req.body.email,
                        subject: 'Recover password ',
                        text: `
                        Hello ${userInfo.username}.
                        There are your new log information. 
                        Login name: ${userInfo.loginname}.
                        Password: ${newPassword}`
                    };
                      
                    await transporter.sendMail(mailOptions, function(error, info){
                        if (err) {
                            res.status(400).send({
                                data: { message:  err.message || "Something wrong!" },
                                result: { code: 1, message: 'Error!' }
                            })
                        } else {
                            res.send({data: {message: 'Success! Please check your email'}, result: { code: 0, message: 'OK' }})
                        }
                    });
                })
            }
            else {
                res.status(400).send({
                    data: { message:  "Email not found!" },
                    result: { code: 1, message: 'Error!' }
                })
            }
        }
        catch (err) {
            res.status(400).send({
                data: { message:  err.message || "Something wrong!" },
                result: { code: 1, message: 'Error!' }
            })
        }
    })
}