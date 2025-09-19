const mongoose = require("mongoose");
 // hàm nay để kiểm tra xem đã kết nối thành công đến database hay chưa
module.exports.connect = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connect success! ");
    }
    catch(error){
        console.log("Connect error! ");
    }
}