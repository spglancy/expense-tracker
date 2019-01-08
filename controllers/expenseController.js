const expense = require('../models/expense.js');
const express = require('express');
const expenseRoutes = express.Router();
const User = require('../models/user.js');
const Comment = require('../models/comment.js');
const shortid = require('short-id');

expenseRoutes.get('/', (req,res) => {
    res.redirect('/api/auth/signup')
})

expenseRoutes.get('/feed', (req, res) => {
    expense.find().then((expense) => {
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



// expenseRoutes.expense('/expenses', (req, res) => {
//
//     if (!req.files) {
//         return res.status(400).send('No files were selected')
//     }
//
//     const body = req.body;
//     // Get the image data from the req.body
//     const imageFile = req.files.image;
//     // Split the name on the .
//     const fileNameArray = imageFile.name.split('.');
//     // get the file extension
//     const fileExtsion = fileNameArray[fileNameArray.length - 1];
//     // generate a short id with the same file extension
//     const filePath = `/${shortid.generate()}.${fileExtsion}`;
//     // Define the upload path
//     const uploadPath = `./uploads/${filePath}`;
//
//     imageFile.mv(uploadPath, (err) => {
//         if(err){
//             console.log(err);
//             return res.status(500);
//         }
//
//     })
//     console.log(req.body)
//
//     expense.create(req.body).then((expense) => {
//         expense.imageRoute = filePath;
// //        let selector = req.body.querySelectorAll('li');
// //        console.log(req);
//         console.log(expense)
//         expense.save();
//         res.redirect(`/expenses/${expense._id}`) // Redirect to expense/:id
//     }).catch((err) => {
//         console.log(err.message)
//     })
// })

expenseRoutes.get('/expenses/:id', (req, res) => {
    Expense.findById(req.params.id).then((expense) => {
        Comment.find( {expenseId: req.params.id} ).then(comment =>
                                                     res.render('expense-view', {
            expense: expense,
            comment: comment,
            expenseId: req.params.id
        }))
    }).catch((err) => {
        console.log(err.message);
    })
})

expenseRoutes.delete('/expenses/:id', (req, res) => {
    console.log(`delete ${req.params.id} `)
    Expense.findByIdAndRemove(req.params.id).then((expense) => {
        res.redirect('/');
    }).catch((err) => {
        console.log(er.message);
    })
})

module.exports = expenseRoutes;
