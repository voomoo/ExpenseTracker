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
      user: req.user.user_id
    });
    let catData = [
      {
        name: "Food",
        income: 0,
        expense: 0,
      },
      {
        name: "Transport",
        income: 0,
        expense: 0,
      },
      {
        name: "Rent",
        income: 0,
        expense: 0,
      },
      {
        name: "Equipment",
        income: 0,
        expense: 0,
      },
      {
        name: "Entertainment",
        income: 0,
        expense: 0,
      },
      {
        name: "Education",
        income: 0,
        expense: 0,
      },
      {
        name: "Salary",
        income: 0,
        expense: 0,
      },
      {
        name: "Freelance",
        income: 0,
        expense: 0,
      },
      {
        name: "Gift",
        income: 0,
        expense: 0,
      },
      {
        name: "Parents",
        income: 0,
        expense: 0,
      },
      {
        name: "Others",
        income: 0,
        expense: 0,
      },
      
    ]
    
    expenses.forEach((elem) => {
      if (elem.accountType === "expense") {
        if (elem.category === "food") {
          catData[0].expense += elem.amount;
        } else if (elem.category === "transport") {
          catData[1].expense += elem.amount;
        } else if (elem.category === "rent") {
          catData[2].expense += elem.amount;
        } else if (elem.category === "equipment") {
          catData[3].expense += elem.amount;
        } else if (elem.category === "entertainment") {
          catData[4].expense += elem.amount;
        } else if (elem.category === "education") {
          catData[5].expense += elem.amount;
        } else if (elem.category === "salary") {
          catData[6].expense += elem.amount;
        } else if (elem.category === "freelance") {
          catData[7].expense += elem.amount;
        } else if (elem.category === "gift") {
          catData[8].expense += elem.amount;
        } else if (elem.category === "parents") {
          catData[9].expense += elem.amount;
        } else if (elem.category === "others") {
          catData[10].expense += elem.amount;
        }
      } else {
        if (elem.category === "food") {
          catData[0].income += elem.amount;
        } else if (elem.category === "transport") {
          catData[1].income += elem.amount;
        } else if (elem.category === "rent") {
          catData[2].income += elem.amount;
        } else if (elem.category === "equipment") {
          catData[3].income += elem.amount;
        } else if (elem.category === "entertainment") {
          catData[4].income += elem.amount;
        } else if (elem.category === "education") {
          catData[5].income += elem.amount;
        } else if (elem.category === "salary") {
          catData[6].income += elem.amount;
        } else if (elem.category === "freelance") {
          catData[7].income += elem.amount;
        } else if (elem.category === "gift") {
          catData[8].income += elem.amount;
        } else if (elem.category === "parents") {
          catData[9].income += elem.amount;
        } else if (elem.category === "others") {
          catData[10].income += elem.amount;
        }
      }
    });

    res.status(200).json({
      success: true,
      data: { expenses, catData },
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
      user.currentBalance -= req.body.amount
      user.totalExpense += req.body.amount
      console.log(userUpdate);
    } else {
      const userUpdate = await User.updateOne(
        { _id: req.user.user_id },
        {
          $set: {
            currentBalance: user.currentBalance + req.body.amount,
            totalIncome: user.totalIncome + req.body.amount,
          },
        }
      );
      user.currentBalance += req.body.amount
      user.totalIncome += req.body.amount
      console.log(userUpdate);
    }
    res.status(201).json({
      success: true,
      data: expense,
      user: user
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
    console.log(user);
    if (expense.accountType === "expense") {
      const userUpdate = await User.updateOne(
        { _id: req.user.user_id },
        {
          $set: {
            currentBalance: user.currentBalance + expense.amount,
            totalExpense: user.totalExpense - expense.amount,
          },
        }
      );
      user.currentBalance += expense.amount
      user.totalExpense -= expense
      console.log(userUpdate);
    } else {
      const userUpdate = await User.findByIdAndUpdate(req.user.user_id, {
        currentBalance: user.currentBalance - expense.amount,
        totalIncome: user.totalIncome - expense.amount,
      });
      user.currentBalance -= expense.amount
      user.totalIncome -= expense.amount
      console.log(userUpdate);
    }
    res.status(200).json({
      success: true,
      data: expense,
      user: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
};
