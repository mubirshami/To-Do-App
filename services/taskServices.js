const Task = require('../models/tasks');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const addTask = async (taskData,id) =>{
    try{
        const taskModal = new Task({...taskData, owner: id});
        const task = await taskModal.save();
        return {task};
    }
    catch(err){
        return {error: err}
    }
};

const getTask = async (id) =>{
    try{
        const task = await Task.find({owner: id});
        if(!task){
            return {error: "Task Not Found"}
        }
        return {task};
    }
    catch(err){
        return {error: err}
    }
}

const updateTask = async (taskData,id) =>{
    try{
        const task = await Task.findByIdAndUpdate(id, taskData, {new: true});   
        if(!task){
            return {error: "Task Not Found"}
        }
        return {task};
    }
    catch(err){
        return {error: err}
    }
}

const deleteTask = async (id) =>{
    try{
        const task = await Task.findByIdAndDelete(id);
        if(!task){
            return {error: "Task Not Found"}
        }
        return {task};
    }
    catch(err){
        return {error: err}
    }
}

module.exports = { addTask, updateTask, deleteTask, getTask }
