const mongoose = require("mongoose");


let user = mongoose.model("user",new mongoose.Schema({
  user : {type:String,required:true},
  pwd : {type:String,required: true},

  //注册时间
  regDate : {type:Date , default:Date.now},
  //头像
  //是否权限禁用
  disabled : {type:Boolean,default: false},
  //是否是管理员
  admin : {type:Boolean,default:false},
  //用户身份 student: 学生， teach: 指导员  leader: 上级领导
  identity: {type: String, default: 'student'}
}));
// user.create({
//   user:"teach",
//   pwd:'123456',
//   admin: true,
//   identity: 'teach'
// })


module.exports = user;
