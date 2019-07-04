const express=require("express")
const router=express.Router();

const pool=require("../pool")

//商品详情接口
router.get('/',function(req,res){
    var pid=req.query.pid;
    var sql=`select * from xm_phone_product where pid=?`;
    pool.query(sql,[pid],function(err,result){
    if(err) throw err;
        res.send( result );
         //console.log(result);
    })
})

module.exports=router;



