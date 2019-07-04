var $mImg=$("#md img");
var $lgImg=$("#lg");
var $mmask=$("#mmask");
var $mask=$("#mask");

var imgWidth=520;
var moved=0;
var imgs=$(".product-img-box");
var img=$(".product-img-box img");
function task(){
    moved--;
    if(moved<-img.length+1){
        moved=-img.length+1;
    }
    $left=moved*520+"px";
    imgs.css("left",$left);
    btnShow()
}
$(".arrows-right").click(function(){
    task();
});
$(".arrows-left").click(function(){
    moved++;
    if(moved>0){
        moved=0;
    }
    $right=moved*520+"px";
    imgs.css("left",$right);
    btnShow()
});

//点亮四个小圆点
var btn=$(".btn");
function btnShow(){	//2张 moved -1  button[1] + on
    var index=Math.abs(moved);
    //console.log(btn,btn[index]);
     if(btn.hasClass("on")){
         btn.removeClass("on");
    }
        btn.eq(index).addClass("on");
        url=$mImg.eq(index).attr("data-lg");
        url=`url(${url})`;
        //console.log(url);
        $lgImg.css("background-image",url);
	}

//点击小圆点  显示对应的图片
	btn.click(function(){
        var btn=$(this);
        var num=btn.attr("count");
		//点击时，当前按钮高亮显示
			if($(".btn").hasClass("on")){
                $(".btn").removeClass("on");
            }
			btn.addClass("on");
        var $left=-(num*imgWidth)+"px";
        imgs.css("left",$left);
        url=$mImg.eq(num).attr("data-lg");
        url=`url(${url})`;
        
        //console.log(url);
        $lgImg.css("background-image",url);
	})


//鼠标移动到mmask上  mask个lg出现  离开时mask和lg隐藏
$mmask.mouseover(function(){
    $lgImg.css("display","block");
    $mask.css("display","block");
});
$mmask.mouseout(function(){
    $lgImg.css("display","none");
    $mask.css("display","none");
});
//移动小方块
$mmask.mousemove(function(e){
    //console.log(e.offsetX,e.offsetY);
    e.offsetX=e.offsetX+38;
    e.offsetY=e.offsetY+96;
    e.offsetX<121?e.offsetX=121:e.offsetX>395?e.offsetX=395:false;
    if(e.offsetY<179){
        e.offsetY=179;
    }else if(e.offsetY>353){
        e.offsetY=353;
    }
    var width=170;
    var height=170;
    $mask.css("top",e.offsetY-height/2);
    $mask.css("left",e.offsetX-width/2);
    $lgImg.css("background-position",`${-2*(e.offsetX-225)}px ${-2*(e.offsetY-190)}px`);
})


$(function(){//DOMContentLoad
    //向服务端接口localhost:3000/index发送ajax请求，获得返回的数组对象
    var pid=location.search.split("=")[1];
    if(pid!==undefined){
        $.ajax({
            url:"http://127.0.0.1:3000/details",
            type:"get",
            data:{pid},
            dataType:"json",//让ajax自动将json字符串转为对象，可直接使用
            //onreadystatechange
            success:function(result){
            //console.log(result[0].title);
            result=result[0];
            //46行:h6 id="p-title"
        //49行:a id="p-subtitle"
        //54行:h2 id="p-price"
        //58行:span id="p-promise"
        $(".product-title").html(result.title);
        $(".img1").attr("src",result.pic);
        $(".img1").attr("data-lg",result.pic);
        $(".product-select-title").html(result.title);
        $(".product-select-sale").html(result.subtitle);
        $(".XiaoMi-activity-price").html(`${result.price}元`);
        var imgurl=`url(../${result.pic})`
        $("#lg").css("background-image",imgurl);
            }
        })
    }else{
        alert("请提供商品编号?pid=?")
    }
})