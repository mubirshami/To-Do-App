const mongoose = require("mongoose");
const schema = mongoose.Schema;
const taskSchema = new schema({
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    });
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;