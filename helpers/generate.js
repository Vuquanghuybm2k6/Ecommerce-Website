module.exports.generateRandomString = (length) =>{
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // phần commit trước thiếu phần định nghĩa character
  let result = "";
  for(let i = 0; i < length; i++){ // lenth là số kí tự muốn random, ví dụ hàm ta nhập 20 thì số kí tự muốn là 20
    result += characters.charAt(Math.floor(Math.random()*characters.length));
  }
  return result;
}