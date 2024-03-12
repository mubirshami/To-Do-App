const taskRouter = require('express').Router();
const { addController, updateController, deleteController ,getController } = require('../controllers/tasksController');

taskRouter.post('/addtasks', addController);
taskRouter.get('/gettasks', getController);
taskRouter.put('/updatetask/:id', updateController);
taskRouter.delete('/deletetask/:id', deleteController);

module.exports = taskRouter;