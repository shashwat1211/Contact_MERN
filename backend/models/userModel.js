const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email',
        },
        required: true
    },
    password:{
        type: String,
        required:true
    }
})
userSchema.statics.signup = async function(email , password){

    if(!email || !password){
        throw Error('All fields are mandatory')
    }
    if (!validator.isEmail(email)) {
        throw Error("Email is not valid")
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Password is not strong enough")
    }


    const exist = await this.findOne({email})

    if(exist){
        throw Error("Email already exists")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password , salt)
    
    const user = this.create({email , password:hash})

    return user
}


userSchema.statics.login = async function(email , password){
    if(!email || !password){
        throw Error("All fields are mandatory")
    }
    
    const user =await this.findOne({ email })

    if(!user){
        throw Error("Invalid Login Credentials")
    }
    //compare the passwords
    const match = await bcrypt.compare(password , user.password )
    if(!match){
        throw Error("Invalid Login Credentials")
    }

    return user;
}


const User = mongoose.model("User" , userSchema);

module.exports = User;