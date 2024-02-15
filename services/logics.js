
//import db.js
const { response } = require('express')
const db = require('../services/db')


//logic for get all employees from the database 
const getAllEmployees=()=>{
    return db.employee.find().then(
       (result)=>{//result-> all employees details
        if(result){
                return{//send to frontend
                    statusCode:200,
                    employees:result//employee details array
                }
        }
        else{
            return{//send to frontend
                statusCode:404,
                message:'Employees not found'
            }
        }
       }
    )
}
//logic for add an employees to the database 
const addEmployee=(id,name,age,designation,salary)=>{
    return db.employee.findOne({id}).then((result)=>{
        //if id is present in the db
        if(result){
            return{
                statusCode:404,
                message:"Employee already exist"
            }
        }
        else{
            //if id is not present in the db, to save all the data in db
            const newEmployee=new db.employee({id,name,age,designation,salary})
            newEmployee.save()
            return{
                statusCode:200,
                message:"Employee added successfully..."
            }
        }
    })
}

//Logic for delete an employee from the database
const deleteEmployee=(id)=>{
    return db.employee.deleteOne({id}).then((response)=>{
        return{
            statusCode:200,
            message:"Employee deleted successfully"
        }
    })
    .catch((error)=>{
        return{
            statusCode:401,
            message:"Can't delete an employee from the database"
        }
    })
}

//Logic for get an employee from the database
const getAnEmployee=(id)=>{
    return db.employee.findOne({id}).then(
        (result)=>{//result-> all employees details
         if(result){
                 return{//send to frontend
                     statusCode:200,
                     employees:result//employee details object
                 }
         }
         else{
             return{//send to frontend
                 statusCode:404,
                 message:'Employees not found'
             }
         }
        }
     )
}

//logic for update an employee details
const updateEmployee=(id,name,age,designation,salary)=>{//updated details 
    return db.employee.findOne({id}).then(
        (result)=>{//result-> an employee details
         if(result){
            //assign updated employee details to the mongodb object
            result.id=id;
            result.name=name;
            result.age=age;
            result.designation=designation;
            result.salary=salary;
            //to save the employee details to the mongodb
            result.save();
                 return{//send to frontend
                     statusCode:200,
                     message:'Employees details updated successfully'
                 }
         }
         else{
             return{//send to frontend
                 statusCode:404,
                 message:'Employees not found'
             }
         }
        }
     )
}

module.exports ={
    getAllEmployees,
    addEmployee,
    deleteEmployee,
    getAnEmployee,
    updateEmployee
}
