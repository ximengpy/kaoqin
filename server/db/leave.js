const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let leave = mongoose.model("leave",new Schema({

  //关联用户表
  user : {type:Schema.Types.ObjectId , ref:"user" , required:true},

  //处理结果
  content : {
    teach: {type: Boolean},
    leader: { type: Boolean}
  },
  //理由
  reason: {type: String},


  //申请日期
  date : {type:Date,default:Date.now},

  //请假日期
  dealDate : {type:String},


  //备注
  info: {
    teach: {type: String},
    leader: { type: String}
  }


}));


//测试
/*for (let i =0;i<100;i++){
  leave.create({
    user : "5e8738da2230e71848f0a971",
    content : "<p>哈哈哈哈哈哈我来评论啦</p>"
  });
}*/



module.exports = leave;
