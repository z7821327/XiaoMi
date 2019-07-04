var uname=sessionStorage.getItem("uname");
if(uname){
    var welcome=document.querySelector(".login");
    var html=`
    <a href="javascript:;" target="_blank">欢迎回来 ${uname}</a>`;
        welcome.innerHTML=html;
}

var uid;
$(function(){//DOMContentLoad
    //向服务端接口localhost:3000/index发送ajax请求，获得返回的数组对象
        $.ajax({
            url:"http://127.0.0.1:3000/cart/cart_name",
            type:"get",
            data:{uname},
            datatype:"json",
              success:function(result){
                 // console.log(result);
                uid=result[0].uid;
               // console.log(uid);
             var countval=1;   
            function load(){   
                $.ajax({
                    url:"http://127.0.0.1:3000/cart",
                    type:"get",
                    data:{uid},
                    datatype:"json",
                      success:function(result,data){
                        //console.log(result.data[0]);
                    var html="";
                     for(var i=0;i<result.length;i++){
                         p=result;
                        // console.log(p[i]);
                         var subtotal=p[i].count*p[i].price;

                         //console.log(subtotal);
                     //   将商品对象的各个属性，填充到HTML片段中
                        html+=`
                        <div class="shop-column">
                        <div class="shop-basket-list">
                            <div class="shop-check_all">
                                <input class="shop-option shop-option-list checked" type="checkbox" checked>
                            </div>
                            <div class="shop-img">
                                <img src="${p[i].pic}" alt="">
                            </div>
                            <div class="shop-title">${p[i].title}</div>
                            <div class="shop-price">${p[i].price}元</div>
                            <div class="shop-count">
                                <div class="shop-count-border">
                                    <a href="javascript:;"><div class="btns">-</div></a>
                                    <input class="count" type="text" value="${p[i].count}">
                                    <a href="javascript:;"><div class="btns">+</div></a> 
                                </div>
                                <p class="shop-count-p">还可买${p[i].product_count-p[i].count}件</p>
                            </div>  
                            <div class="shop-total shop-total-0">${subtotal}</div>
                            <div class="shop-operate">
                                <a class="shop-operate-x del" href="#" data-sid="${p[i].sid}">×</a>
                            </div>
                        </div>        
                    </div>`;
                        //将填充好的HTML片段，放入页面中指定的父元素下        
                        }
                    document.querySelector(".shop-product").innerHTML=html; 
                    //找到每个数量的input
                    var carinput=document.getElementsByClassName("count");
                    var carcount=0;
                    //console.log(carinput[0].value);
                    for(var i=0;i<carinput.length;i++){
                        carcount+=parseInt(carinput[i].value);
                    }
                    document.querySelector(".buy-count").innerHTML=`共 ${carcount} 件商品，`;               
                    btn();
                    del();
                    onkeyop();
                    chbAll();   
                    loadCart();
                }
            }) 
        }
        load();
        $.ajax({
            url:"http://127.0.0.1:3000/cart/car_product",
            type:"get",
            dataType:"json",//让ajax自动将json字符串转为对象，可直接使用
            //onreadystatechange
            success:function(result){
            var html="";
            for(var p of result){
                  //将商品对象的各个属性，填充到HTML片段中
                  html+=`
                  <div class="clearfix-commodity">
                  <a href="${p.href}"><img class="clearfix-img" src="${p.pic}" alt=""></a> 
                  <a href="#"><p class="clearfix-title">${p.title}</p></a>   
                  <span class="clearfix-price">${p.price}元</span>
                  <a class="clearfix-goodrep-a" href="javascript:;">
                      <div class="clearfix-goodrep-count">4.5万人好评</div>
                      <div class="clearfix-goodrep" data-pid="${p.pid}">加入购物车</div>
                  </a>
              </div>`;
                  //将填充好的HTML片段，放入页面中指定的父元素下      
            }
            //console.log(html);
            var clearfix=document.querySelector(".clearfix");
            clearfix.innerHTML=html;
            //获取每个加入购物车按钮
            var addcarts=document.querySelectorAll(".clearfix-goodrep");
      
            for(var addcart of addcarts){
                addcart.onclick=function(){
                    //console.log(this.getAttribute("data-pid"));
                    var pid=this.getAttribute("data-pid");   
                    var count=1;
                    $.ajax({
                        url:"http://127.0.0.1:3000/cart/reg",
                        type:"get",
                        data:{pid,uid,count},
                        dataType:"json",
                        success:function(result){
                            load();
                        }
                    })
                }
            }
    
    
            }
          })
function btn(){        
//先找到改变商品数量的元素
var btns=document.getElementsByClassName("btns");
//console.log(btns);
for(var btn of btns){
    //console.dir(btn);
    //当 单击 btn按钮时，自动执行后续任务
    btn.onclick=function(){
        // alert("疼!");
        //找到当前按钮
        var btn=this;
        //console.log(btn);
        //找到当前按钮旁边的input
        var inp=btn.parentNode.parentNode.childNodes[3];
        //console.log(inp);
        //取出span内容
        var n=parseInt(inp.value);
        //console.log(n);
        //获取剩余数量
        var shopCount=parseInt(btn.parentNode.parentNode.nextElementSibling.innerHTML.slice(3,-1));
        //console.log(shopCount);
        //如果当前按钮时+
        if(btn.innerHTML=="+"){//就给span的内容+1
            if(shopCount>0){
                n++;
                shopCount--;
            }else{
                btn.disabled=true;
            }
        }
        //否则,只有n>1
        else if(n>1){ //就给span的内容-1
            n--;
            shopCount++;
            }
            //将n放回span的内容
            btn.parentNode.parentNode.nextElementSibling.innerHTML=`还可买${shopCount}件`;
            inp.value=n;
            //二.数量变化，计算小计
            //我现在站在那儿？
            //获得单价所在的td:btn的爹的前一个兄弟
            var pri=btn.parentNode.parentNode.parentNode.previousElementSibling;
            //console.log(pri);
            //获得单价：
            var price=pri.innerHTML.slice(0,-1); 
            //console.log(price);                 
            //小计=单价*数量n
            var sub=price*n;
            //console.log(sub); 
            //小计放到哪里去?本行中最后一个td中
            //获取要放的位置
            var pri1=btn.parentNode.parentNode.parentNode.nextElementSibling;
            pri1.innerHTML=sub+"元";
             loadCart();
    }
}
}
//键盘输入的数字自动改变小计
//先找到每个input的.count位置
function onkeyop(){
var inpCounts=document.getElementsByClassName("count");
for(var inpCount of inpCounts){
    inpCount.onkeyup=function(){
        var inpCount=this;
        var shopCount=parseInt(inpCount.parentNode.nextElementSibling.innerHTML.slice(3,-1));
        var n=parseInt(inpCount.value);
        var shopCounts=shopCount+n;
        var price=parseInt(inpCount.parentNode.parentNode.previousElementSibling.innerHTML.slice(0,-1));
        //如果数量足够
        if(n<=shopCount){
            //当前行price*n给小计
            inpCount.parentNode.parentNode.nextElementSibling.innerHTML=`${price*n}元`;
            //记录剩余商品数量
            inpCount.parentNode.nextElementSibling.innerHTML=`还可买${shopCount-n}件`;
            //记录当前inpCount.value
            n=inpCount.value;
             //计算总价
            loadCart();    
        }else if(n>shopCount){
        //否则提示数量不足
            alert("库存只剩"+shopCount+"件，"+"不足"+n+"件");
        }     
    }   
}
}
function del(){
//删除当前行
//查找删除触发事件当元素.del
var dels=document.getElementsByClassName("del");
//console.log(dels);
//找到当前行
var table=document.getElementsByClassName("shopping-cart")[0];
//console.log(table);
//为每个.del的元素绑定单击事件
for(var del of dels){
  del.onclick=function(){
    var del=this;
    //console.log(del);
    var sid=this.getAttribute("data-sid");
    //console.log(sid);
    var bool=confirm("是否删除该商品？");
    //如果用户点确定删除
    if(bool==true){
         //才删除按钮所在的行
        $.ajax({
            url:"http://127.0.0.1:3000/cart/del",
            type:"get",
            data:{sid},
            dataType:"json",//让ajax自动将json字符串转为对象，可直接使用
            //onreadystatechange
            success:function(result){
                load();
            }
        })      
    }
    loadCart();  
  }
  
}
}

//全选
function chbAll(){
    //1.查找触发事件的元素
    //查找table下thead下tr下第一个th中的input
    var chbAll=document.querySelector(".shop-basket-head>div:first-child>input");
    //console.log(chbAll);
    //tbody下所有tr中的第一个td中的input
    var chbs=document.querySelectorAll(".shop-option-list");
    //console.log(chbs);
    //2.绑定事件处理函数
    chbAll.onclick=function(){
        //var chbAll=this;
        //3.查找要修改的元素
        //已在外部找过，可直接使用chbs集合
        //4.修改元素
        //遍历chbs中每个chb元素对象
        for(var chb of chbs){
            //当前chb的checked状态和chbAll的checked状态始终保持一致就行
            chb.checked=chbAll.checked;
            loadCart();
        }
    }

    //遍历chbs中的每个chb元素对象
    for(var chb of chbs){
        //每遍历一个，都要绑定单击事件处理函数
        chb.onclick=function(){
            var chb=this;
            //3.查找要修改的元素:chbAll
            //4.修改元素
            //如果当前chb是取消选中,则chbAll一定不选
            if(chb.checked==false){
                chbAll.checked=false;
               // console.log(chb);
            }else{//否则
                //如果找不到未选中的chb
                //先查找.shop-option-list中未选中的input
                var unchecked=document.querySelector(".shop-option-list:not(:checked)");
                if(unchecked==null){
                    chbAll.checked=true;
                } 
            }
            loadCart();
        } 
    }

}

//封装一个计算总价的函数
function loadCart(){
    var checkeds=document.querySelectorAll(".shop-basket-list>div>.checked:checked");
    var totalPrice=0;
    var buycount=0;
    for(var i=0;i<checkeds.length;i++){
            var count=parseInt(checkeds[i].parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.children[1].value);
            var price=checkeds[i].parentNode.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML.slice(0,-1);
            totalPrice+=count*price;
            buycount+=count;
    }
    document.getElementsByClassName("buy-count1")[0].innerHTML=`已选择 ${buycount} 件`;
    document.getElementsByClassName("total")[0].innerHTML=`${totalPrice}`;
}
     
            }
            })

    })



