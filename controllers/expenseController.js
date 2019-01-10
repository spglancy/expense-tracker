const Expense = require('../models/expense.js');
const express = require('express');
const expenseRoutes = express.Router();
const User = require('../models/user.js');
const shortid = require('short-id');

expenseRoutes.get('/', (req,res) => {
    res.redirect('/api/auth/signup')
})

expenseRoutes.get('/home/:id', (req, res) => {
    Expense.find().then((expense) => {
        res.render('home', {
            expense: expense
        });
    })
        .catch((err) => {
        console.log(err);
    })
})

expenseRoutes.get('/expense-new', (req,res) => {
    res.render('new-expense');
})

expenseRoutes.post('/home/:id', (req, res) => {
    Expense.create(req.body).then((expense) => {
        console.log(expense);
        res.render('home', {
            expense: expense
        });
    })
})

expenseRoutes.delete('/expenses/:id', (req, res) => {
    console.log(`delete ${req.params.id} `)
    Expense.findByIdAndRemove(req.params.id).then((expense) => {
        res.redirect('/home/:id');
    }).catch((err) => {
        console.log(er.message);
    })
})

module.exports = expenseRoutes;
