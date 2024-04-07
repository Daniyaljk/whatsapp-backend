import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema({
    name :{
        type : String,
        required : [true,'please provide your name.']
    },
    email :{
        type: String,
        required:[true,"please provide your email."],
        unique: [true,"please enter unique email."],
        lowerCase : true,
        validate : [validator.isEmail,'please provide your email.']
    },
    picture :{
        type:String,
        default : "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    status :{
        type:String,
        default:'hey there i am using whats app'
    },
    password :{
        type : String,
        required : [true,'please provide your password'],
        minLength : [6,'please make sure your password is at least 6 character long'],
        maxLength : [128,'smaller than 128 character.']
    }
},{
    collection : "users",
    timestamps : true
})

const UserModel = mongoose.models.UserModel || mongoose.model("UserModel",userSchema)

export default UserModel;
