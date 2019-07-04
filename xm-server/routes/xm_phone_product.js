const express=require("express")
const router=express.Router();

const pool=require("../pool")

//手机商品接口
router.get('/',function(req,res){
        var sql=`SELECT * FROM xm_phone_product WHERE pid<9`;
        pool.query(sql,function(err,result){
        if(err) throw err;
            res.send( result );
             //console.log(result);
        })
})

module.exports=router;



