var express = require('express');
var router = express.Router();





/*用户数据接口*/
router.use("/user",require('./user/index'));



/*请假接口*/
router.use("/leave",require('./leave/index'));


/*登陆接口*/
router.use("/login",require('./login/index'));

module.exports = router;
