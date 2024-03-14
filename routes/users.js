const userRouter = require('express').Router();
const { addController, updateController, deleteController, getController, signinController, addAvatarController, deleteAvatarController, getAvatarController } = require('../controllers/usersController');
const { verifyToken } = require('../middlewares/jwt');

userRouter.post('/addusers', addController);
userRouter.post('/myavatar', verifyToken, addAvatarController);
userRouter.get('/getusers',verifyToken, getController);
userRouter.put('/updateme', verifyToken, updateController);
userRouter.delete('/deleteme', verifyToken, deleteController);
userRouter.post('/signin', signinController);
userRouter.delete('/deleteavatar', verifyToken, deleteAvatarController);
userRouter.get('/getavatar', verifyToken, getAvatarController);

module.exports = userRouter;