const Expense = require("../models/Expenses");

//@desc get all the expenses
//@route GET api/v1/expense-tracker
//@access PRIVATE
exports.getExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.where("user").equals(req.user.user_id);
    res.status(200).json({
      success: true,
      data: expenses,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
};

//@desc get single expense
//@route GET api/v1/expense-tracker/id
//@access PRIVATE
exports.getExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id);
    res.status(200).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
};

//@desc create new expense
//@route POST api/v1/expense-tracker
//@access PRIVATE
exports.createExpense = async (req, res, next) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

//@desc update existing expense
//@route PUT api/v1/expense-tracker/id
//@access PRIVATE
exports.updateExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
};

//@desc delete existing expense
//@route DELETE api/v1/expense-tracker
//@access PRIVATE
exports.deleteExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
};
