//node + MongoDB connection
//import mongoose
const mongoose = require('mongoose')

//connection string
mongoose.connect('mongodb://localhost:27017/EMS')

//create a model
const employee = mongoose.model('employee',{
    id:Number,
    name:String,
    age:Number,
    designation:String,
    salary:String
})

module.exports={
    employee
}