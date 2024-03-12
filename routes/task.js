const taskRouter = require('express').Router();
const { addController, updateController, deleteController ,getController } = require('../controllers/tasksController');
const { verifyToken } = require('../middlewares/jwt');

taskRouter.post('/addtasks', verifyToken, addController);
taskRouter.get('/gettasks', verifyToken, getController);
taskRouter.put('/updatetask/:id',verifyToken, updateController);
taskRouter.delete('/deletetask/:id',verifyToken, deleteController);

module.exports = taskRouter;