const express = require('express');
const router = express.Router();
const {getExpenses, getExpense, createExpense, updateExpense, deleteExpense} = require("../controllers/expense")

router.route('/').get(getExpenses).post(createExpense)
router.route('/:id').get(getExpense).put(updateExpense).delete(deleteExpense)


module.exports = router;