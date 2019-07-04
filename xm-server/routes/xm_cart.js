const express=require("express")
const router=express.Router();

const pool=require("../pool")

//通过用户名查uid
router.get("/cart_name",(req,res)=>{
    //参数
    var uname = req.query.uname;
    //sql
    var sql = "SELECT uid FROM xm_user WHERE uname=?";
    pool.query(sql,[uname],(err,result)=>{
      if(err)throw err;
      res.send(result)
    });
  })

//用户购物车接口
 //查询指定用户购物车信息
 router.get("/",(req,res)=>{
    //参数
    var uid = req.query.uid;
    //sql
    var sql = "select * from xm_shoppingcart a join xm_phone_product b on a.pid=b.pid where uid=?";
    pool.query(sql,[uid],(err,result)=>{
      if(err)throw err;
      res.send(result)
      //console.log(result);
    });
  })
   

  //删除指定购物车中一个商品
router.get("/del",(req,res)=>{
    //参数:sid
    var sid = req.query.sid;
    //sql:
    var sql = "DELETE FROM xm_shoppingcart WHERE sid = ?";
    //json
    pool.query(sql,[sid],(err,result)=>{
       if(err)throw err;
       //console.log(result);
       res.send({code:1,msg:"删除成功"})
    })
  })


//购物车推荐商品接口
router.get('/car_product',function(req,res){
    var sql="SELECT * FROM xm_phone_product WHERE pid BETWEEN 11 AND 20";
    pool.query(sql,function(err,result){
    if(err) throw err;
        res.send( result );
         //console.log(result);
    })

  })

//加入商品到购物车接口
router.get('/reg',function(req,res){
  var pid=parseInt(req.query.pid)
  
  var uid=parseInt(req.query.uid);
  var count=parseInt(req.query.count);
  //console.log(pid,uid,count)

  var sql="SELECT * FROM xm_shoppingcart WHERE pid=? AND uid=?";
  pool.query(sql,[pid,uid],function(err,result){
    if(err) throw err;
    if(result.length>0){
      var sql1="UPDATE xm_shoppingcart SET count=count+? WHERE pid=? AND uid=?";
      pool.query(sql1,[count,pid,uid],function(err,result){
        if(err) throw err;
          res.send(result);
      })
    }else{
      var sql2=`INSERT INTO xm_shoppingcart VALUES(null,?,?,?,1)`;
       pool.query(sql2,[uid,pid,count],function(err,result){
        if(err) throw err;
        if( result.affectedRows>0 ){
         res.send(result);
        }
       });
    }
  })
}); 



module.exports=router;



