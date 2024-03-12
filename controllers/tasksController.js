const {addTask, updateTask, deleteTask, getTask} = require('../services/taskServices');

const addController = async (req, res) => {
    try {
        const userid = req.user.id;
        const data = req.body;
        const result = await addTask(data,userid);

        if (result.error) {
            res.status(400).json({ error: result.error });
        }
        res.status(201).json({ task: result.task });
    } catch (err) {
        res.json(err);
    }
};

const getController = async (req, res) => { 
    try {
        const userid = req.user.id;
        const result = await getTask(userid);
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }
        res.status(200).json({ task: result.task });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const updateController = async (req, res) => {  
    try {
        const id = req.params.id;
        const data = req.body;
        const result = await updateTask(data,id);
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }
        res.status(201).json({ task: result.task });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteController = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteTask(id);
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }
        res.status(200).json({ task: result.task });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { addController, updateController, deleteController, getController };