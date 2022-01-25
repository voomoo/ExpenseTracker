const express = require("express");
const router = express.Router();
const {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpensesRange,
} = require("../controllers/expense");

router.route("/expense-range").get(getExpensesRange);
router.route("/").get(getExpenses).post(createExpense);
router.route("/:id").get(getExpense).put(updateExpense).delete(deleteExpense);

module.exports = router;
