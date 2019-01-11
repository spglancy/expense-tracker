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
    const currentUser = req.user;
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

expenseRoutes.post('/home/:id', (req, res) => {
    Expense.create(req.body).then((expense) => {
        console.log(expense);
        res.render('home', {
            expense: expense
        });
    })
})

expenseRoutes.delete('/home/:id/:id', (req, res) => {
    console.log(`delete ${req.params.id} `)
    Expense.findByIdAndRemove(req.params.id).then((expense) => {
        res.redirect(`/home/`);
    }).catch((err) => {
        console.log(err.message);
    })
})

module.exports = expenseRoutes;
