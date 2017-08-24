const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Message = require('../models/message');

router.post('/signup', (req, res) => {   
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let password = req.body.password;
    let email = req.body.email;

    let user = new User({
        firstname: firstname,
        lastname: lastname,
        password: bcrypt.hashSync(password, 10),
        email: email
    });
    user.save(function(err, obj) {
        if (err) {
            for (field in err.errors) {
                if (field === 'email') {
                    return res.status(500).json({
                        message: "Email already exist",
                        error: err
                    });
                }
                return res.status(500).json({
                    message: "Create user fail",
                    error: err
                });
            }
        }
        res.status(201).json({
            message: "User successfully created",
            user: obj
        });
    });
});

router.post('/login', (req, res) => {
    let email = req.body.email; 
    
    User.findOne({email: email}, function(err, user) {
        let password = req.body.password;
        
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error',
                error: err
            });
        }

        if (!user) {
            return res.status(401).json({
                message: 'Login failed',
                error: err
            });
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({
                message: 'Email/Password don\'t match',
                error: err
            });
        }

        res.status(200).json({
            message: 'Success login',
            token: jwt.sign({ data: user }, process.env.JWT_SECRET, { expiresIn: 60 * 60 }),
            userId: user._id
        });
    });
});

module.exports = router;