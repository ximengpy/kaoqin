const express = require("express");
const userDB = require("../../db/user");
const sessionDB = require("../../db/session");



let router = express.Router();

/*请求用户列表*/
router.get("/get", (req, res) => {
  userDB.find({}, {pwd: 0, __v: 0})
    .then(data => {
      res.send({
        code: 0,
        msg: "请求成功",
        data
      })
    })
    .catch(() => {
      res.send({
        code: 4,
        msg: "服务器错误",
        data: []
      });
    })
});

/*删除用户*/
router.post("/delete", (req, res) => {
  let {_id} = req.body;

  /*删除用户*/
  userDB.deleteOne({_id})
    .then(d => {
      //删除用户session
      sessionDB.deleteMany({session:new RegExp(_id)},()=>{});
      //删除最近访客
      visitorDB.deleteMany({user:_id},()=>{});

      res.send({
        code: 0,
        msg: "删除成功"
      });
    })
    .catch(() => {
      res.send({
        code: 4,
        msg: "服务器错误"
      });
    })
});

/*更新用户数据*/
router.post("/update",(req, res)=>{
  let {_id,data} = req.body;
  userDB.updateOne({_id},data)
    .then(()=>{
      //删除用户session
      sessionDB.deleteMany({session:new RegExp(_id)},()=>{});

      res.send({
        code : 0,
        msg : "操作完成"
      });
    })
    .catch(()=>{
      res.send({
        code : 4,
        msg : "服务错误"
      })
    })
});

/*请求单个用户数据*/
/*router.get("/info",(req,res)=>{
  let {_id} = req.query;
  userDB.findById(_id,{user:1,disabled:1,admin:1,_id:0})
    .then(data=>{
      res.send({
        code:0,
        msg : "查找完成",
        data
      })
    })
    .catch(()=>{
      res.send({
        code:4,
        msg : "服务器错误"
      });
    })
});*/

module.exports = router;
