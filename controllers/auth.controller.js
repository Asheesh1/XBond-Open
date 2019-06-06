const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const config = require('../environment/config')
const supportEmail = config.emails.support.email
const frontEndServerLink = config.frontEnd.link

const User = require('../models').User
const AuthToken = require('../models').AuthToken
const salt = 10
const secret = "ad1k3o12k3ok)()(*D*)"
const transporter = require('./helper.controller').transporter

module.exports = {

    databaseCheck(req, res ) {
        User.create({
            name: "Asheesh",
            email: "asheesh@gmail.com",
            password: "unhashed"
        }).then(docs =>{
            return res.json({message: "Created"})
        })
    },

    register(req, res) {
        
        // Check email validity
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(req.body.email).toLowerCase())) {
            return res.status(409).json({error: true, message: "Please enter valid email!", data: null})
        }

        if ( !Boolean(req.body.password) || !Boolean(req.body.email)) {
            return res.status(409).json({error: true, message: "Please enter valid fields", data: null})
        }
        if ( req.body.password.trim() === '' || req.body.email.trim() === '') {
            return res.status(409).json({error: true, message: "Please enter valid fields", data: null})
        }

        return bcrypt.hash(req.body.password, salt, function(err, hash) {

            return User.create({
                email: req.body.email,
                password: hash
            }).then(user => {
                let token = jwt.sign({user: req.body.email },
                    secret,
                    { 
                        // expiresIn: '24h',
                        algorithm: 'HS256'
                    }
                );
                console.log("Sending email to : " + req.body.email)
                AuthToken.create({
                    email: req.body.email,
                    token: token,
                }).then(docs =>{
                    var registerMailOption = {
                        from: supportEmail,
                        to: req.body.email,
                        subject: 'Verify your account',
                        // html: '<p>Your html here</p>'// plain text body
                        template: 'verify-account',
                        context: {
                            link:  frontEndServerLink + '/verify-account?token=' + '' +token /*+ '&user=' + docs._id*/,
                            name: "User"
                        }
                    };
                    return transporter.sendMail(registerMailOption, function(error, info){
                        if (error) {
                            console.log("Error in sending Forgot Password mail to the admin. Error Report: " + error);
                            return res.status(500).json({message: config.operationFailedMessage, error:true})
                        } else return res.json({error: false, data: null, message: "A verification mail has been sent to your email, please verify your account!"})
                    }); 
                })
            })
        })
    }, 

    verifyEmail(req, res) {

    },

    login(req, res) {
        
    },
    
    checkDuplicateEmail(req, res, next) {

    },
    
    checkDuplicateUsername(req, res, next) {

    } 
}