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

const getTask = async (id, sort) =>{
    try{
        const task = await Task.find({ owner: id }).limit(2).skip(0).sort(sort);
        if(!task){
            return {error: "Task Not Found"}
        }
        return {task};
    }
    catch(err){
        return {error: err}
    }
}

const updateTask = async (userid,taskData,id) =>{
    try{
        const task = await Task.findOneAndUpdate({_id: id, owner: userid}, taskData, {new: true})
        if(!task){
            return {error: "Task Not Found"}
        }
        return {task};
    }
    catch(err){
        return {error: err}
    }
}

const deleteTask = async (userid,id) =>{
    try{
        const task = await Task.findByIdAndDelete({owner: userid, _id: id});
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
