const mongoose = require('mongoose');

const expense = mongoose.model('expense', {
    user: String,
    description: String,
    value: String,
    imageRoute: String,
    category: String,
    userId: String
});

module.exports = expense;
