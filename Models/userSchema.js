
//  import mongoose in userSchema.js file 

const  mongoose=require('mongoose')

// using mongoose we can define schema for users
// schema means structure

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    acno:{
        type:String,
        required:true,
        unique:true
    },
    balance:{
        type:Number,
        required:true
    },
    transactions:{
        type:Array,
        required:true
    }
})


// create a model / collection to store documents as given schema

// mongodb atals il collection inte name aanu model kazhinju argeument string aayittu koduthekkunne next userschema koduthu bcoz aa oru typeil aanu model vrnde 

const users = mongoose.model("users",userSchema)

// export model

module.exports=users