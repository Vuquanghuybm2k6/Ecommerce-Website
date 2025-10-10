const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
// Cloudinary
// phần này để kết nối với cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET // Click 'View API Keys' above to copy your API secret
});
// End Cloudinary

module.exports.upload = (req, res, next) =>{
  if (req.file) { // nếu có file thì mới cho upload trên online
    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };
    // ở đây ta định nghĩa một hàm tên là upload
    async function upload(req) {
      // trong này ta gọi đến 1 hàm tên là streamUpload
      let result = await streamUpload(req);
      console.log(result.secure_url);
      req.body[req.file.fieldname] = result.secure_url // ta đặt là req.body[req.file.fieldname] bởi vì nếu giả sử như sau này cái 
      // biến thumbnail ở trong file create.pug nó không còn tên là thumbnail nữa mà có thể là cái tên khác như "name"
      // chính vì thế nên ta phải gọi đến cái req.file.fieldname
      // do thêm đoạn code req.body[req.file.fieldname] = result.secure_url này rồi nên ở đoạn controller phải xóa đoạn code 
      //if (req.file) { 
      //   req.body.thumbnail = `/uploads/${req.file.filename}` 
      // }
      next();
    }
    upload(req); // khi gọi hàm upload và truyền vào cái biến req
  } else {
    next(); // sau khi upload xong thì phải gọi đến cái  next() để nó thực hiện bước tiếp theo, không thì nó không sang được controller 
  }
}