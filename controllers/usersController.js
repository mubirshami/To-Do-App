const { signIn, addUser, updateUser , deleteUser, getUser} = require('../services/usersServices');

const addController = async (req, res) => {
    try {
        const data = req.body;
        const result = await addUser(data);

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }
        res.status(201).json({ user: result.user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getController = async (req, res) => {
    try {
        const user = req.user;
        const result = await getUser(user);
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }
        res.status(200).json({ user: result.user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateController = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = await updateUser(data,id);
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }
        res.status(201).json({ user: result.user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteController = async (req, res) => {
    try {
        const id = req.user.id;
        const result = await deleteUser(id);
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }
        res.status(200).json({ user: result.user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const signinController = async (req, res) => {
    try {
        const data = req.body;
        const result = await signIn(data);
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }
        res.status(200).json({ user: result.user, message: "User Logged In", token: result.token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { addController, updateController, deleteController, getController, signinController };
