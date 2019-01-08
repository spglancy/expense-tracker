const mongoose = require('mongoose');

const comment = mongoose.model('comment', {
    userId: String,
    content: String
});

module.exports = comment;