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

exports.getExpensesRange = async (req, res, next) => {
  try {
    const d = new Date();
    const range = parseInt(req.query.range);
    if (isNaN(range) && range < 0) {
      d.setDate(d.getDate() - 1);
    } else {
      d.setDate(d.getDate() - range);
    }
    console.log({ startDate: new Date(), endDate: d });
    const expenses = await Expense.find({
      createdAt: { $gte: d, $lte: new Date() },
    });
    let income = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let expense = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let label = [
      "Food",
      "Transport",
      "Rent",
      "Equipment",
      "Entertainment",
      "Education",
      "Salary",
      "Freelance",
      "Gift",
      "Parents",
      "Others",
    ];

    expenses.forEach((elem) => {
      if (elem.accountType === "expense") {
        if (elem.category === "food") {
          expense[0] += elem.amount;
        } else if (elem.category === "transport") {
          expense[1] += elem.amount
        } else if (elem.category === "rent") {
          expense[2] += elem.amount
        } else if (elem.category === "equipment") {
          expense[3] += elem.amount
        } else if (elem.category === "entertainment") {
          expense[4] += elem.amount
        } else if (elem.category === "education") {
          expense[5] += elem.amount
        } else if (elem.category === "salary") {
          expense[6] += elem.amount
        } else if (elem.category === "freelance") {
          expense[7] += elem.amount
        } else if (elem.category === "gift") {
          expense[8] += elem.amount
        } else if (elem.category === "parents") {
          expense[9] += elem.amount
        } else if (elem.category === "others") {
          expense[10] += elem.amount
        }
      } else {
        if (elem.category === "food") {
          income[0] += elem.amount;
        } else if (elem.category === "transport") {
          income[1] += elem.amount
        } else if (elem.category === "rent") {
          income[2] += elem.amount
        } else if (elem.category === "equipment") {
          income[3] += elem.amount
        } else if (elem.category === "entertainment") {
          income[4] += elem.amount
        } else if (elem.category === "education") {
          income[5] += elem.amount
        } else if (elem.category === "salary") {
          income[6] += elem.amount
        } else if (elem.category === "freelance") {
          income[7] += elem.amount
        } else if (elem.category === "gift") {
          income[8] += elem.amount
        } else if (elem.category === "parents") {
          income[9] += elem.amount
        } else if (elem.category === "others") {
          income[10] += elem.amount
        }
      }
    });

    res.status(200).json({
      success: true,
      data: expenses,
      income,
      expense,
      label
    });
  } catch (error) {
    res.status(400).json({
      success: "Finding expense error",
    });
    console.log({ error });
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
    const user = await User.findById(req.user.user_id);
    console.log(req.body.accountType);
    if (expense.accountType === "expense") {
      const userUpdate = await User.updateOne(
        { _id: req.user.user_id },
        {
          $set: {
            currentBalance: user.currentBalance + req.body.amount,
            totalExpense: user.totalExpense - req.body.amount,
          },
        }
      );
      console.log(userUpdate);
    } else {
      const userUpdate = await User.findByIdAndUpdate(req.user.user_id, {
        currentBalance: user.currentBalance - req.body.amount,
        totalIncome: user.totalIncome - req.body.amount,
      });
    }
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
