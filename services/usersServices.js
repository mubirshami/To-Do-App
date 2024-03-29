const User = require('../models/users');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Task = require('../models/tasks');
const sharp = require('sharp');

const addUser = async (userData) =>{
    try{
      userData.password = await bcrypt.hash(userData.password, 10);
      const userModal = new User(userData);
      const user = await userModal.save();
      return {user};
    }
    catch(err){
        return {error: err}
    }
};

const getUser = async (userData) =>{
    try{
      const user = await User.findById(userData.id);
      return {user};
    }
    catch(err){
        return {error: err}
    }
};

const updateUser = async (userData,id) =>{
    try{
      const user = await User.findByIdAndUpdate(id, userData, {new: true});
      return {user};
    }
    catch(err){
        return {error: err}
    }
};

const deleteUser = async (id) =>{
    try{
      const user = await User.findByIdAndDelete(id);
      const task = await Task.deleteMany({owner: id});
      return {user, task};
    }
    catch(err){
        return {error: err}
    }
};

const signIn = async (userData) =>{
    try{
      const user = await User.findOne({email: userData.email});
      if(!user){
        return {error: "User Not Found"}
      }
      const isMatch = await bcrypt.compare(userData.password, user.password);
      if(!isMatch){
        return {error: "Invalid Password"}
      }
      const token = jwt.sign({id: user._id}, process.env.SECRET_KEY, {expiresIn: "1h"});
      return {user, token};
    }
    catch(err){
        return {error: err}
    }
  };

const uploadAvatar = async (userData) =>{
    try{
      const user = await User.findById(userData.id);
      const imageBuffer = await sharp(userData.avatar).resize({width: 150, height: 150}).png().toBuffer();
      user.avatar = imageBuffer;
      await user.save();
      return {user};
    }
    catch(err){
        return {error: err}
    }
};

const deleteAvatar = async (id) =>{
    try{
      const user = await User.findById(id);
      user.avatar = undefined;
      await user.save();
      return {user};
    }
    catch(err){
        return {error: err}
    }
};

const getAvatar = async (id) =>{
    try{
      const user = await User.findById(id);
      if(!user || !user.avatar){
        throw new Error("No Avatar Exists");
      }
      return { avatar: user.avatar };
    }
    catch(err){
        return {error: err}
    }
};

module.exports = { addUser, updateUser, deleteUser, getUser, signIn, uploadAvatar, deleteAvatar, getAvatar }