
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const userSchema=new mongoose.Schema({
    fullName:{type:String,required:true},
    email:{type:String,required:true,unique:true},

    password:{type:String,required:true,unique:true},
    salt:{type:String},
    profileImageUrl:{
        type:String,
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    }
},{
    timeStamp:true
});
userSchema.pre("save",async function(next){
if(this.isModified("password")){
    try {
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(this.password,salt);
        this.salt=salt;
        this.password=hashedPassword;
        next();
        
    } catch (error) {
        next(error);
    }
}else{
next();
}

  
});
const User=mongoose.model('user',userSchema);
module.exports={User}