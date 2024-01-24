const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//template to add to our database using a schema(model)
const todoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    userID: String, 
    serverID: String,
    tasks: [String],
});

//export our model
module.exports = mongoose.model("To-Do", todoSchema, 'to-do');