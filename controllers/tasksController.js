const {addTask, updateTask, deleteTask, getTask} = require('../services/taskServices');

const addController = async (req, res) => {
    try {
        const userid = req.user.id;
        const data = req.body;
        const result = await addTask(data,userid);

        if (result.error) {
            res.status(400).json({ error: result.error.message });
        }
        res.status(201).json({ task: result.task });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getController = async (req, res) => { 
    try {
        const sort = {};
        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(":");
            sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
        }
        const userid = req.user.id;
        const result = await getTask(userid,sort);
        if (result.error) {
            return res.status(400).json({ error: result.error.message });
        }
        res.status(200).json({ task: result.task });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

const updateController = async (req, res) => {  
    try {const userid = req.user.id;
        console.log(userid);
        const id = req.params.id;
        const data = req.body;
        const result = await updateTask(userid,data,id);
        if (result.error) {
            return res.status(400).json({ error: result.error.message });
        }
        res.status(201).json({ task: result.task });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

const deleteController = async (req, res) => {
    try {
        const userid = req.user.id;
        const id = req.params.id;
        const result = await deleteTask(userid,id);
        if (result.error) {
            return res.status(400).json({ error: result.error.message });
        }
        res.status(200).json({ task: result.task });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

module.exports = { addController, updateController, deleteController, getController };