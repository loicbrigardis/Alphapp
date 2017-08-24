const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const path = require('path');

const User = require('../models/user');
const Message = require('../models/message');

router.get('/', (req, res) => {
    Message.find()
           .populate('user', 'firstname')
           .exec(function(err, messages) {
               if (err) {
                    return res.status(500).json({
                        message: 'An Error occured',
                        error: err
                    });
               }
               res.status(200).json({
                    message: 'Success',
                    obj: messages
               });
           });
});

// Check if user is authentificated
router.use('/', (req, res, next) => {
    jwt.verify(req.query.token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
            return res.status(401).json({
                message: 'Not authentificated',
                error: err
            });
        }
        next();
    });
});

router.post('/', (req, res) => {
    let content = req.body.content;
    let username = req.body.username;

    let userDecoded = jwt.decode(req.query.token).data;
    
    User.findById(userDecoded._id, function(err, user) {
        if(err) {
            return res.status(500).json({
                message: 'Can not find user',
                error: err
            });
        }

        let message = new Message({
            content: content,
            user: user
        });

        message.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An Error occured',
                    error: err
                });
            }
            user.message.push(result);
            user.save();
            res.status(201).json({
                title: 'Message created',
                obj: result
            });
        });
        
    });
});

router.delete('/', (req, res) => {
    let messageId = req.query.id;
    let userDecoded = jwt.decode(req.query.token).data;

    Message.findById(messageId, function(err, message) {
        if (err) {
            return res.status(500).json({
                message: 'Can not find user',
                error: err
            });
        }
        if (!message) {
            return res.status(500).json({
                message: 'Message not found',
                error: err
            });
        }

        if (message.user != userDecoded._id) {
            return res.status(401).json({
                message: 'User do not match',
                error: err
            });
        }

        message.remove(function(err, result){
            if (err) {
                return res.status(500).json({
                    message: 'Can not find user',
                    error: err
                });
            }
            res.status(200).json({
                title: 'Message deleted',
                obj: result
            });
        });
    });
});

router.patch('/', (req, res) => {
    let MessageBody = req.body;
    let userDecoded = jwt.decode(req.query.token).data;

    Message.findById(MessageBody.messageId, function(err, message) {
        if (err) {
            return res.status(500).json({
                message: 'Can not find message',
                error: err
            });
        }
        if (message.user != userDecoded._id) {
            return res.status(401).json({
                message: 'User do not match',
                error: { error: 'Error' }
            });
        }
        message.content = MessageBody.content;
        message.save();
        res.status(200).json({
            title: 'Message updated',
            obj: message
        });
    });
});

module.exports = router;