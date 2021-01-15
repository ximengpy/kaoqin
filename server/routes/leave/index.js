const express = require("express");
const leave = require("../../db/leave");
const userDb = require("../../db/user")
let router = express.Router();

/*申请*/
router.post("/apply",(req,res)=>{
  let {userId,reason,dealDate} = req.body;
  //后端数据验证
  let data = {
    userId: userId || '',
    reason: reason || '',
    dealDate: dealDate || '',
  }
  /*数据库存储*/
  leave.create(data).then(d=>{
    console.log("dddddddddd", d)
    res.send({
      code : 0,
      msg : "申请成功"
    })
  }).catch((e)=>{
    console.log(e)
    res.send({
      code : 4,
      msg : "申请失败，请稍后再试"
    })
  })


  /*获取请假列表*/
router.get("/get",(req,res)=>{
  //用户id
  let {_id} = req.body;
  userDb.findOne({_id}).then(data => {
    if(data.identity === 'student') {
      //学生查找本人申请的所有
      leave.find({user: _id}, {}, {sort: {date: -1}}).then(d => {
        res.send({
          code: 0,
          msg: '查找成功',
          data: d
        })
      }).catch(err => {
        console.log(err)
      })
    } else {
      //老师或领导获取所有信息
      leave.find({}, {}, {sort: {date: -1}}).then(d => {
        res.send({
          code: 0,
          msg: '查找成功',
          data: d
        })
      }).catch(err => {
        console.log(err)
      })
    }
  })
});

/*取消申请*/
router.post("/cancel",(req,res)=>{
  //请假表_id
  let {_id} = req.body;

  /*删*/
  leave.remove({_id})
    .then(n=>{
      res.send({
        code : 0,
        msg : "删除成功"
      });
    })
    .catch(e=>{
      res.send({
        code : 4,
        msg : "服务器错误"
      });
    })
});

/*老师领导审批*/
router.post("/update",(req,res)=>{
  let {leaveId,content, info, userId} = req.body;
  userDb.findOne({userId}).then(data => {
    if(data.identity === 'teach') {
      //老师处理
      leave.updateOne({leaveId},{$set: {'content.$.teach': content, 'info.$.teach': info}})
      .then((c)=>{
        res.send({
          code : 0,
          msg : "处理成功",
          data: c
        })
      })
      .catch(()=>{
        res.send({
          code : 4,
          msg : "处理失败，服务器错误"
        })
      })
    }
    if(data.identity === 'leader') {
      //领导
      leave.updateOne({leaveId},{$set: {'content.$.leader': content, 'info.$.leader': info}})
      .then((c)=>{
        res.send({
          code : 0,
          msg : "处理成功",
          data: c
        })
      })
      .catch((err)=>{
        console.log(err)
        res.send({
          code : 4,
          msg : "处理失败，服务器错误"
        })
      })
    }
  })

});

});
module.exports = router;
