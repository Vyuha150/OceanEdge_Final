const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Name is required",
    },
    
    email: {
      type: String,
      required: "Email is required",
      unique: true,
    },
    password: {
      type: String,
      required: "Password is required",
    },
    role:{
      type:String,
      enum: ["user", "admin"],
      default: "user",
      
    }
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
