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
    let food = { income: 0, expense: 0 };
    let transport = { income: 0, expense: 0 };
    let rent = { income: 0, expense: 0 };
    let equipment = { income: 0, expense: 0 };
    let entertainment = { income: 0, expense: 0 };
    let education = { income: 0, expense: 0 };
    let salary = { income: 0, expense: 0 };
    let freelance = { income: 0, expense: 0 };
    let gift = { income: 0, expense: 0 };
    let parents = { income: 0, expense: 0 };
    let others = { income: 0, expense: 0 };

    expenses.forEach((elem) => {
      if (elem.accountType === "expense") {
        if (elem.category === "food") {
          food.expense += elem.amount;
        } else if (elem.category === "transport") {
          transport.expense += elem.amount;
        } else if (elem.category === "rent") {
          rent.expense += elem.amount;
        } else if (elem.category === "equipment") {
          equipment.expense += elem.amount;
        } else if (elem.category === "entertainment") {
          entertainment.expense += elem.amount;
        } else if (elem.category === "education") {
          education.expense += elem.amount;
        } else if (elem.category === "salary") {
          salary.expense += elem.amount;
        } else if (elem.category === "freelance") {
          freelance.expense += elem.amount;
        } else if (elem.category === "gift") {
          gift.expense += elem.amount;
        } else if (elem.category === "parents") {
          parents.expense += elem.amount;
        } else if (elem.category === "others") {
          others.expense += elem.amount;
        }
      } else {
        if (elem.category === "food") {
          food.income += elem.amount;
        } else if (elem.category === "transport") {
          transport.income += elem.amount;
        } else if (elem.category === "rent") {
          rent.income += elem.amount;
        } else if (elem.category === "equipment") {
          equipment.income += elem.amount;
        } else if (elem.category === "entertainment") {
          entertainment.income += elem.amount;
        } else if (elem.category === "education") {
          education.income += elem.amount;
        } else if (elem.category === "salary") {
          salary.income += elem.amount;
        } else if (elem.category === "freelance") {
          freelance.income += elem.amount;
        } else if (elem.category === "gift") {
          gift.income += elem.amount;
        } else if (elem.category === "parents") {
          parents.income += elem.amount;
        } else if (elem.category === "others") {
          others.income += elem.amount;
        }
      }
    });

    res.status(200).json({
      success: true,
      data: expenses,
      food,
      transport,
      rent,
      equipment,
      entertainment,
      education,
      salary,
      freelance,
      gift,
      parents,
      others,
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
