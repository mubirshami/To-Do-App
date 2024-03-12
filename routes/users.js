const userRouter = require('express').Router();
const { addController, updateController, deleteController, getController, signinController } = require('../controllers/usersController');
const { verifyToken } = require('../middlewares/jwt');

userRouter.post('/addusers', addController);
userRouter.get('/getusers',verifyToken, getController);
userRouter.put('/updateme', verifyToken, updateController);
userRouter.delete('/deleteme', verifyToken, deleteController);
userRouter.post('/signin', signinController);

module.exports = userRouter;