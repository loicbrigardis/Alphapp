const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

var MessageSchema = Schema(
{ 
    content: {
        type: 'string',
        required: true
    }, 
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    } 
}
);

MessageSchema.post('remove', function(message) {
    User.findById(message.user, function(err, user) {
        user.message.pull(message);
        user.save();
    });
});


module.exports = mongoose.model('Message', MessageSchema);