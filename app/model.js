var mongoose = require('mongoose');

const user = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String
});
const User = mongoose.model('User', user);

module.exports = User;
