//js/header.js
/*包含页头相关的所有代码*/
$(function(){
    $.ajax({
      url:"footer.html",
      type:"get",
      success:function(html){
        //console.log(html)
        $(html).replaceAll("#footer");
        $(`<link rel="stylesheet" href="css/footer.css"/>`).appendTo("head")
      }
    })
  })

