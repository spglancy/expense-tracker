const Expense = require('../models/expense.js');
const express = require('express');
const expenseRoutes = express.Router();
const User = require('../models/user.js');
const shortid = require('short-id');

expenseRoutes.get('/', (req,res) => {
    const currentUser = req.user;
    if(currentUser){
        res.redirect(`/home/${req.user._id}`)
    }
    res.redirect('/api/auth/signup')
})

expenseRoutes.get('/home/:id', (req, res) => {
    Expense.find().then((expense) => {
        res.render('home', {
            expense: expense,
            user: req.user
        });
    })
        .catch((err) => {
        console.log(err);
    })
})

expenseRoutes.post('/home/expenses', (req, res) => {
    const currentUser = User.findOne(req.body.userId);
    Expense.create(req.body).then((expense) => {
        currentUser.total += req.body.value;
        console.log(currentUser.total)
        console.log(expense);
        res.redirect(`/home/${req.body.userId}`)
    })
})

expenseRoutes.delete('/home/expenses/:id', (req, res) => {
    console.log(`delete ${req.params.id} `)
    Expense.findByIdAndRemove(req.params.id).then((expense) => {
        res.redirect(`/`);
    }).catch((err) => {
        console.log(err.message);
    })
})

module.exports = expenseRoutes;
