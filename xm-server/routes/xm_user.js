const express=require("express")
const router=express.Router();

const pool=require("../pool")

//账号登录接口
router.post("/login",(req,res)=>{
    var uname=req.body.uname;
    var upwd=req.body.upwd;
    var sql="SELECT * FROM xm_user WHERE uname=? AND upwd=md5(?)";
    pool.query(sql,[uname,upwd],(err,result)=>{
        if(err) throw err;
        if(result.length==0){
            res.send({code:-1,msg:"用户名或密码不正确！"});
        }else{ 
            res.send({code:1,msg:"登录成功"});
        }
    })
})


//手机登录接口
router.post("/phone_login",(req,res)=>{
    var phone=req.body.phone;
    var note_code=req.body.note_code;
    var sql="SELECT * FROM xm_user WHERE phone=? AND note_code=?";
    pool.query(sql,[phone,note_code],(err,result)=>{
        if(err) throw err;
        //console.log(result)
        if(result.length==0){
            res.send({code:-1,msg:"手机号或验证码不正确！"});
        }else{
            res.send({code:1,msg:"登录成功123"});
        }
    })
})

//手机号检测接口
router.post("/phone_reg",(req,res)=>{
    var phone=req.body.phone;
    var sql="SELECT * FROM xm_user WHERE phone=?";
    pool.query(sql,[phone],(err,result)=>{
        if(err) throw err;
        //console.log(result)
        if(result.length>0){
            res.send({code:-1,msg:"手机号已存在,请换一个手机号输入!"});
        }else{
            res.send({code:1,msg:"手机号注册成功!"});
        }
    })
})

//注册接口
router.post("/reg",(req,res)=>{
    var uname=req.body.uname;
    var upwd=req.body.upwd;
    if(!uname){
        res.send({code:-401,msg:"账号不能为空"})
        //阻止往后执行
        return;
    }
    if(!upwd){
        res.send({code:-402,msg:"密码不能为空"})
        //阻止往后执行
        return;
    }
     
    var unamesql="SELECT * FROM xm_user WHERE uname=?";
    pool.query(unamesql,[uname],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:-1,msg:"该小米ID已存在!"});
        }else{
            var sql="INSERT INTO xm_user SET ?";
            pool.query(sql,[req.body],(err,result)=>{
               if(err) throw err;
                if( result.affectedRows>0){
                    res.send({code:1,msg:"注册成功"});
                }
            })
        }
    })  
})


module.exports=router;



