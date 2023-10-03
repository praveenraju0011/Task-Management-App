const mongoose = require("mongoose");

//create
const listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type:String,
        require: true
    },
    status: {
        type:Boolean,
        require: true
    },
    date: {
        type:Date,
        default: Date
    },
    user: [
        {
            type:mongoose.Types.ObjectId,
            ref:"User"
        }
    ]
})

module.exports = mongoose.model("List",listSchema);