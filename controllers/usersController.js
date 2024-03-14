const { signIn, addUser, updateUser , deleteUser, getUser,uploadAvatar, deleteAvatar, getAvatar } = require('../services/usersServices');
const multer = require('multer');

const addController = async (req, res) => {
    try {
        const data = req.body;
        const result = await addUser(data);

        if (result.error) {
            return res.status(400).json({ error: result.error.message });
        }
        res.status(201).json({ user: result.user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

const getController = async (req, res) => {
    try {
        const user = req.user;
        const result = await getUser(user);
        if (result.error) {
            return res.status(400).json({ error: result.error.message });
        }
        res.status(200).json({ user: result.user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

const updateController = async (req, res) => {
    try {
        const id = req.user.id;
        const data = req.body;
        const result = await updateUser(data,id);
        if (result.error) {
            return res.status(400).json({ error: result.error.message });
        }
        res.status(201).json({ user: result.user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

const deleteController = async (req, res) => {
    try {
        const id = req.user.id;
        const result = await deleteUser(id);
        if (result.error) {
            return res.status(400).json({ error: result.error.message });
        }
        res.status(200).json({ user: result.user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

const signinController = async (req, res) => {
    try {
        const data = req.body;
        const result = await signIn(data);
        if (result.error) {
            return res.status(400).json({ error: result.error.message });
        }
        res.status(200).json({ user: result.user, message: "User Logged In", token: result.token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const addAvatarController = async (req, res) => {
    try {
        const upload = multer({
            limits: {
                fileSize: 1000000
            },
            fileFilter(req, file, cb) {
                if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
                    return cb(new Error('Please upload a valid image file'));
                }
                cb(undefined, true);
            }
        });
        upload.single('avatar')(req, res, async (err) => {
            if (err) {
                return res.status(400).send({ error: err.message });
            }
            const userData = {
                id: req.user.id,
                avatar: req.file.buffer
            };
            const result = await uploadAvatar(userData);
            if (result.error) {
                return res.status(400).send({ error: result.error.message });
            }
            res.send('Avatar uploaded successfully');
        });
    } catch (err) {
        res.status(500).send({err:err.message});
    }
};

const deleteAvatarController = async (req, res) => {
    try {
        const userid = req.user.id
        const result = await deleteAvatar(userid);
        if (result.error) {
            return res.status(400).send({ error: result.error.message });
        }
        res.send('Avatar deleted successfully');
    } catch (err) {
        res.status(500).send({err:err.message});
    }
}

const getAvatarController = async (req, res) => {
    try {
        const userid = req.user.id;
        const result = await getAvatar(userid);
        if (result.error) {
            return res.status(400).send({ error: result.error.message });
        }
        res.set('Content-Type', 'image/png');
        res.send(result.avatar);
    }
    catch (err) {
        res.status(500).send({err:err.message});
    }
};

module.exports = { addController, updateController, deleteController, getController, signinController, addAvatarController, deleteAvatarController, getAvatarController };
