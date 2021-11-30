const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  accountType: {
    type: String,
      required: true,
      enum: [
        'expense',
        'income'
      ]
  },
  createdAt: {
    type: Date,
      default: Date.now
  },
  expenseDate: {
    type: Date,
      default: Date.now
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description can not be more than 500 characters']
  },
  category:{
      type:String,
      required: [true, 'Please Choose a category'],
      enum:[
          'food',
          'transport',
          'rent',
          'equipment',
          'entertainment',
          'education',
          'salary',
          'freelance',
          'gift',
          'parents',
          'others'
      ]
  },
  amount:{
      type: Number,
      required: [true, "Amount is required"]
  },
  finalBalance: {
      type: Number,
      default: 0
  },
  user:{
      type:String,
      required:true
  }
});

module.exports = mongoose.model("Expense", ExpenseSchema);
