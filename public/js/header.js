//js/header.js
/*包含页头相关的所有代码*/
$(function(){
    $.ajax({
      url:"header.html",
      type:"get",
      success:function(html){
        //console.log(html)
        $(html).replaceAll("#header");
        $(`<link rel="stylesheet" href="css/header.css"/>`).appendTo("head")

        var uname=sessionStorage.getItem("uname");
        if(uname){
        var uid;
        $.ajax({
            url:"http://127.0.0.1:3000/cart/cart_name",
            type:"get",
            data:{uname},
            dataType:"json",
              success:function(result){
                //console.log(result[0].uid)
                uid=result[0].uid;
                $.ajax({
                    url:"http://127.0.0.1:3000/cart",
                    type:"get",
                    data:{uid},
                    dataType:"json",
                    success:function(result){
                        //console.log(result);
                var count=0;
                for(var i=0;i<result.length;i++){
                    count+=result[i].count;
                }
                if(uname){
                var welcome=$(".welcome");
                var html=`<div class="topbar-cart">
                <a ckass="cart-mini" href="shop-car.html" target="shop-car">
                    <i class="iconfont">
                        <img class="cart-mini-top" src="img/index/shop_car.png" alt=""/>
                    </i>购物车
                    <span class="cart-mini-num j_cartNum">（${count}）</span>
                </a>
            </div>
            <div class="header-login">
                <a href="javascript:;" class="login" target="login">${uname}</a>
                <span class="sep">|</span>
                <a href="javascript:;" class="writeoff">注销</a>
                <span class="sep">|</span>
                <a href="#">消息通知</a>
            </div>`;
                welcome.html(html);
                }
                $(".writeoff").on('click',function(){
                sessionStorage.removeItem("uname");
                alert("注销成功");
                setTimeout(()=>{
                    location.href="index.html"
                },1000)
                })

            }
        })

              } 
          })
        }
      }
    })
  })

