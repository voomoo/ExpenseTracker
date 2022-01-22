const Expense = require("../models/Expenses");
const User = require("../models/Users");

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
    const payload = { ...req.body, user: req.user.user_id };
    const expense = await Expense.create(payload);
    const user = await User.findById(req.user.user_id);
    console.log(req.body.accountType);
    if (req.body.accountType === "expense") {
      const userUpdate = await User.updateOne(
        { _id: req.user.user_id },
        {
          $set: {
            currentBalance: user.currentBalance - req.body.amount,
            totalExpense: user.totalExpense + req.body.amount,
          },
        }
      );
      console.log(userUpdate);
    } else {
      const userUpdate = await User.findByIdAndUpdate(req.user.user_id, {
        currentBalance: user.currentBalance + req.body.amount,
        totalIncome: user.totalIncome + req.body.amount,
      });
    }
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
