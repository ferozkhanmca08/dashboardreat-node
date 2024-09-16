const mongoos=require('mongoose');
const userSchema =new mongoos.Schema({
    name:String,
    email:String,
    password:String
});
module.exports = mongoos.model("users",userSchema);