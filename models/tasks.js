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
    owner: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User",
    },
    });
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;