const userRouter = require('express').Router();
const { addController, updateController, deleteController, getController, signinController, addAvatarController } = require('../controllers/usersController');
const { verifyToken } = require('../middlewares/jwt');

userRouter.post('/addusers', addController);
userRouter.post('/myavatar', verifyToken, addAvatarController);
userRouter.get('/getusers',verifyToken, getController);
userRouter.put('/updateme', verifyToken, updateController);
userRouter.delete('/deleteme', verifyToken, deleteController);
userRouter.post('/signin', signinController);

module.exports = userRouter;