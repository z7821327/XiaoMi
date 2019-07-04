$(function(){
    var show_num = [];
    draw(show_num);
    $("#canvas").on('click',function(){
     draw(show_num);
    })
    $(".btn").on('click',function(){
     var val = $(".login-verity").val().toLowerCase();
     var num = show_num.join("");
     if(val==''){
        $(".verify").removeClass("none");
        $(".verify").addClass("block");
        $(".mistake").html("请输入验证码");  
      //alert('请输入验证码！');
     }else if(val == num){
      //alert('提交成功！');
      $(".login-verity").val('');
      $(".verify").removeClass("block");
      $(".verify").addClass("none");
      // draw(show_num);
      //判断账号密码是否正确
      //先获取用户输入的账号密码
        var uname=$(".login-uname").val();
        var upwd=$(".login-upwd").val();
        var reg=/^\w{6,18}$/;
        if(reg.test(uname)==true){
          $(".verify").addClass("none");
          if(reg.test(upwd)==true){
            $(".verify").addClass("none");
            //发送ajax请求
            $.ajax({
              url:"http://127.0.0.1:3000/user/login",
              type:"post",
              data:{uname:uname,upwd:upwd},
              datatype:"jsonp",
              
              success:function(result){
             // console.log(result);
              if(result.code==1){
                sessionStorage.setItem("uname",uname);
                //4:3秒后跳转首页
                alert("登录成功1秒跳转到首页");
                setTimeout(function(){
                    location.href="index.html"
                },1000)
              }else{
                $(".verify").removeClass("none");
                $(".verify").addClass("block");
                $(".mistake").html("用户名或密码不正确");
              } 
              }
              })
          }else{
            $(".verify").removeClass("none");
            $(".verify").addClass("block");
            $(".mistake").html("用户名或密码不正确");
          }
        }else{
          $(".verify").removeClass("none");
          $(".verify").addClass("block");
          $(".mistake").html("用户名或密码不正确");
        }

     }else{
      //alert('验证码错误！请重新输入！');
      $(".verify").removeClass("none");
      $(".verify").addClass("block");
      $(".mistake").html("验证码不正确");
      $(".login-verity").val('');
      // draw(show_num);
     }
    })
   })
   //生成并渲染出验证码图形
   function draw(show_num) {
    var canvas_width=$('#canvas').width();
    var canvas_height=$('#canvas').height();
    var canvas = document.getElementById("canvas");//获取到canvas的对象，演员
    var context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
    canvas.width = canvas_width;
    canvas.height = canvas_height;
    var sCode = "a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
    var aCode = sCode.split(",");
    var aLength = aCode.length;//获取到数组的长度
    for (var i = 0; i < 5; i++) { //这里的for循环可以控制验证码位数（如果想显示6位数，4改成6即可）
     var j = Math.floor(Math.random() * aLength);//获取到随机的索引值
     // var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
     var deg = Math.random() - 0.5; //产生一个随机弧度
     var txt = aCode[j];//得到随机的一个内容
     show_num[i] = txt.toLowerCase();
     var x = 10 + i * 20;//文字在canvas上的x坐标
     var y = 20 + Math.random() * 8;//文字在canvas上的y坐标
     context.font = "bold 23px 微软雅黑";
     context.translate(x, y);
     context.rotate(deg);
     context.fillStyle = randomColor();
     context.fillText(txt, 0, 0);
     context.rotate(-deg);
     context.translate(-x, -y);
    }
    for (var i = 0; i <= 4; i++) { //验证码上显示线条
     context.strokeStyle = randomColor();
     context.beginPath();
     context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
     context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
     context.stroke();
    }
    for (var i = 0; i <= 30; i++) { //验证码上显示小点
     context.strokeStyle = randomColor();
     context.beginPath();
     var x = Math.random() * canvas_width;
     var y = Math.random() * canvas_height;
     context.moveTo(x, y);
     context.lineTo(x + 1, y + 1);
     context.stroke();
    }
   }
   //得到随机的颜色值
   function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
   }

   //切换手机短信登录
    $(".cut-phone-login").click(function(){
      $(".user-login").addClass("none");
      $(".phone-login").removeClass("none");
    });
   //切换用户密码登录
    $(".cut-user-login").click(function(){
      $(".phone-login").addClass("none");
      $(".user-login").removeClass("none");
    });
  //切换扫码登录
    $(".cut-scancode-login").click(function(){
      $(".cut-scancode").addClass("none");
      $(".cut-scancode-login").addClass("active");
      $(".scancode-login").removeClass("none");
      $(".cut-users-login").removeClass("active");
    });
  //切换用户登录
  $(".cut-users-login").click(function(){
    $(".scancode-login").addClass("none");
    $(".cut-users-login").addClass("active");
    $(".cut-scancode").removeClass("none");
    $(".cut-scancode-login").removeClass("active");
  });    


$(".phone_btn").on('click',function(){
  var pver=$(".phone-verify");
  var pmis=$(".phone-mistake");
  var pcode=$(".login-code");
  var preg=/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
  var phone=$(".login-phone").val();
  var note_code=$(".login-code").val();
  if($(".login-phone").val()==''){
    pver.removeClass("none");
    pmis.html("手机号不能为空！");
  }else if(!preg.test(phone)){
    pver.removeClass("none");
    pmis.html("请输入有效手机号！");
  }else if(pcode.val()==''){
    pver.removeClass("none");
    pmis.html("短信验证码不能为空！");
  }else{
    pver.addClass("none");
       $.ajax({
          url:"http://127.0.0.1:3000/user/phone_login",
          type:"post",
          data:{phone:phone,note_code:note_code},
          datatype:"json",
            success:function(result){
              console.log(result)
            if(result.code==-1){
              pver.removeClass("none");
              pmis.html("手机号或短信验证码有误");
            }else{
              sessionStorage.setItem("uname",phone);
              alert("登录成功1秒跳转到首页");
              setTimeout(function(){
                  location.href="index.html"
              },1000)
            } 
          }
        })
  }
})
