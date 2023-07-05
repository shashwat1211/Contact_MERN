const mongoose= require("mongoose")
const validator = require("validator")
const Schema = mongoose.Schema

const contactSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    info:{
        type:Number,
        required:true
    },
    email: {
        type: String,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email',
        },
        required:false
    },
    address:{
        type:String,
       // required:false,
        default:"N/A"
    },
    user_id:{
        type: String,
        required: true
    }
    //object tell when object is created
}, {timestamps:true})


module.exports = mongoose.model("contact", contactSchema);