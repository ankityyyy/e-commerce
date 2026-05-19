import mongoose from "mongoose";

const   userSchema= new mongoose.Schema({
     name:{
           type: String,
    
     },

     email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password:{
     type:String,
    },
    provider: {
    type: String, // 'google', 'github', 'local', etc.
    default: 'local'
   
  },
  providerId: {
    type: String, // the unique ID from Google/GitHub
   
  },
  role: {
      type: String,
      enum: ["admin", "seller", "customer"],
      default: "customer",
    },
    cartData:{
     type:Object,
     default:{}

    },

   
},
 {
    timestamps: true,
    minimize:false 
  }
)

const User = mongoose.model("User", userSchema);

export default User;