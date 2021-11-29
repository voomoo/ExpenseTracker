//@desc get all the expenses
//@route GET api/v1/expense-tracker
//@access PRIVATE
exports.getExpenses = (req, res, next) => {
    res.status(200)
        .json({success:true, msg: "Get all the expenses according to account"})
}

//@desc get single expense
//@route GET api/v1/expense-tracker/id
//@access PRIVATE
exports.getExpense = (req, res, next) => {
    res.status(200)
        .json({success:true, msg: `Get the expense record with id ${req.params.id}`})
}

//@desc create new expense
//@route POST api/v1/expense-tracker
//@access PRIVATE
exports.createExpense = (req, res, next) => {
    res.status(200)
        .json({success:true, msg: "Create a new Expense"})
}

//@desc update existing expense
//@route PUT api/v1/expense-tracker/id
//@access PRIVATE
exports.updateExpense = (req, res, next) => {
    res.status(200)
        .json({success:true, msg: `update the expense record with id ${req.params.id}`})
}

//@desc delete existing expense
//@route DELETE api/v1/expense-tracker
//@access PRIVATE
exports.deleteExpense = (req, res, next) => {
    res.status(200)
        .json({success:true, msg: `delete the expense record with id ${req.params.id}`})
}