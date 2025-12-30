module.exports.generateRandomString = (length) =>{
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for(let i = 0; i < length; i++){ // lenth là số kí tự muốn random, ví dụ hàm ta nhập 20 thì số kí tự muốn là 20
    result += charaters.charAt(Math.floor(Math.random()*charaters.length));
  }
  return result;
}