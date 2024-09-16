const mongoos=require('mongoose');
const productSchema =new mongoos.Schema({
    name:String,
    price:String,
    category:String,
    userId:String,
    company:String
});
module.exports = mongoos.model("products",productSchema);