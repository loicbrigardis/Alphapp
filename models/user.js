const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseUniqValid = require('mongoose-unique-validator');
const mongooseErrorsHandler = require('mongoose-mongodb-errors');

var UserSchema = Schema(
    {
        firstname: {
            type: String,
            trim: true,
            required: true
        },
        lastname: {
            type: String,
            trim: true,
            required: true
        },
        password: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: "Email already exist"
        },
        message: [{
            type: Schema.Types.ObjectId,
            ref: 'Message'
        }],
    }
);

UserSchema.plugin(mongooseErrorsHandler);
UserSchema.plugin(mongooseUniqValid);

module.exports = mongoose.model('User', UserSchema);