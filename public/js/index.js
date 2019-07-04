//轮播指示符
//要修改的元素
var wrap = document.querySelector(".wrap");
//查找触发事件的元素
var next = document.querySelector(".arrow_right");
var prev = document.querySelector(".arrow_left");
//绑定事件处理函数 -> 左右箭头
next.onclick = function () {
    next_pic(); //调用next_pic函数
}
prev.onclick = function () {
    prev_pic();  //调用prev_pic函数
}
//设置向右移动1226距离即一张图片的宽度
function next_pic () {
    var newLeft;
    //修改元素
    if(wrap.style.left === "-4904px"){  //当图片在第5张时，即xmad_5.jpg
        newLeft = 0;            //点击右箭头跳到第2张，即xmad_1.jpg
    }else{  //否则
        newLeft = parseInt(wrap.style.left)-1226; //每点击一次图片整体往左移动1226px
    }
    wrap.style.left = newLeft + "px";   //必须带单位px
    index++;
    if(index > 4){
    index = 0;
    }
    showCurrentDot();
}
//设置向左移动1226距离即一张图片的宽度
function prev_pic () {
    var newLeft;
    //修改元素
    if(wrap.style.left === "0px"){  //当图片在第1张时，即xmad_1.jpg
        newLeft = -4904;      //点击左箭头跳到第6张，即xmad_5.jpg
    }else{
        newLeft = parseInt(wrap.style.left)+1226; //每点击一次图片整体往左移动1226px
    }
    wrap.style.left = newLeft + "px";   //必须带单位px
    index--;
    if(index < 0){
     index = 4;
    }
    showCurrentDot();
}

//自动播放
var timer = null;
    function autoPlay(){
        //setInterval()： 间隔指定的毫秒数不停地执行指定的代码，定时器
        timer = setInterval(function () {   //设置定时器
            //定时器执行的功能
            next_pic();  //调用上面向右移动一张图片
        },2000);   //1秒=1000毫秒  设置每2秒执行一次next_pic();->向右移动一张图片
    }
    autoPlay();

//当鼠标放在图片上时，图片停止自动播放
//查找要触发事件的元素
var f1_img = document.querySelector(".f1_img");
//鼠标放上去停止播放
f1_img.onmouseenter = function () {
   // clearInterval()： 用于停止 setInterval() 方法执行的函数代码
    clearInterval(timer); //
}
//鼠标移开自动播放
f1_img.onmouseleave = function () {
    //当鼠标移开时调用 autoPlay();继续执行
    autoPlay();    
}



//设置buttons的index初始值为0，即第一个span的class为on，
//然后触发next_pic函数时，index加1，当触发prev_pic函数时，inex减1， 并设置当前index的小圆点的class为on， 这就要求index必须设置为全局变量，才能保证它在每一个函数的作用域中
var index = 0;
var dots = document.querySelectorAll("#buttons_span");
function showCurrentDot () {
    for(var i = 0, len = dots.length; i < len; i++){
        dots[i].className = "";
    }
    dots[index].className = "on";
}



//轮播指示符
//当点击小圆点时， 就可跳转到相应图片。 
//实现原理即： 点击小圆点，就使wrap的Left变成相应的值。代码如下
for (var i = 0, len = dots.length; i < len; i++){
    (function(i){
        dots[i].onclick = function () {
            var dis = index - i;
            if(index == 4 && parseInt(wrap.style.left)!==-4904){
                dis = dis - 4;     
            }
            //和使用prev和next相同，在最开始的照片5和最终的照片1在使用时会出现问题，导致符号和位数的出错，做相应地处理即可
            if(index == 0 && parseInt(wrap.style.left)!== 0){
                dis = 4 + dis;
            }
            wrap.style.left = (parseInt(wrap.style.left) +  dis * 1226)+"px";
            index = i;
            showCurrentDot();
        }
    })(i);            
}

// 3楼家电商品
$(".fam-app").mouseenter(function(){
    var $this=$(this);
    $(".fam-shop").addClass("none");
    $(`#${$this.attr("data-name")}`).removeClass("none");
});

// 4楼智能商品
$(".cap-app").mouseenter(function(){
    var $this=$(this);
    $(".cap-shop").addClass("none");
    $(`#${$this.attr("data-name")}`).removeClass("none");
});

$(function(){//DOMContentLoad
    //向服务端接口localhost:3000/index发送ajax请求，获得返回的数组对象
      $.ajax({
        url:"http://127.0.0.1:3000/index",
        type:"get",
        dataType:"json",//让ajax自动将json字符串转为对象，可直接使用
        //onreadystatechange
        success:function(result){
        //console.log(result);
        var html="";
        for(var p of result){
            //   将商品对象的各个属性，填充到HTML片段中
              html+=`
              <li class="f2_right-li">                    
              <div class="f2_right-div">新品</div>
              <div class="f2_right-dimg">
                  <a href="${p.href}">
                      <img class="w-100" src="${p.pic}" alt="">
                  </a>
              </div>
              <a class="f2_right-a" href="javascript:;">${p.title}</a>
              <p class="f2_right-p">${p.subtitle}</p>
              <p class="price">${p.price}元</p>
              </li>`;
              //将填充好的HTML片段，放入页面中指定的父元素下
               
        }
        $(".p1").append(html);
        }
      })
    })
    