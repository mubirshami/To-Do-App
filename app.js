const express = require('express');
require('dotenv').config();
const cors = require('cors');
const userRouter = require('./routes/users');
const taskRouter = require('./routes/task');
const mongooseConnectDB = require('./config/db.config.js');

const app = express();

const port = process.env.PORT || 3000;


app.use(cors({origin: "*"}));
app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

const start = async () => {
try {
    console.log("Starting server ...")
    
    await mongooseConnectDB();
    app.listen(port, () => console.log("Server started on port:",port));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

start();

module.exports = app;