$(function(){
    //初始化菜单
    var clientW=$(window).width();
    var clientH=$(window).height();
    $(".fathers").css({
        width:clientW,
        height:clientH
    })
    $(".menu").click(function(){
        $(".fathers").slideToggle(200);
    })

    //轮播图
    var nowNum=0;
    var nextNum=0;
    var nowTime=0;
    var flag=true;

    function move(){
        nextNum++;
        if(nextNum==3){
            nextNum=0;
            flag=false;
        }
        $(".list:eq("+nowNum+")").animate({width:"80%",height:"80%"}).css("zIndex=0");
        $(".list:eq("+nextNum+")").animate({left:0},function(){
            $(".list:eq("+nowNum+")").css({width:"100%",height:"100%",left:"100%"})
            nowNum=nextNum;
            nowTime=0;
            flag=true;
        }).css("zIndex",1);

    }

    function moves(){
        nowTime+=50;
        var bili=nowTime/3000;
        if(bili>1){
            bili=1;
        }
        $(".progress").eq(nowNum).css({width:bili*100+"%"});
        if(flag===false){
            $(".progress").css("width",0);
        }
    }
    var t1=setInterval(move,3000);
    var t2=setInterval(moves,50);

    $(window).focus(function(){
        t1=setInterval(move,3000);
        t2=setInterval(moves,50);
    })
    $(window).blur(function(){
        clearInterval(t1);
        clearInterval(t2);
    })

    $(".btns-list").click(function(){
        nextNum=$(this).index(".btns-list");
        stop();
    })
    $(".leftbtn").click(function(){
        nextNum--;
        if(nextNum==-1){
            nextNum=2;
        }
        stop();
    })
    $(".rightbtn").click(function(){
        nextNum++;
        if(nextNum==3){
            nextNum=0
        }
        stop();
    })
    function stop(){
        clearInterval(t1);
        clearInterval(t2);
        //按钮的变化
        $(".btns-list").find(".progress").css("width",0);
        $(".btns-list").eq(nextNum).find(".progress").css("width","100%");
        //轮播图发生变化
        if(nextNum>nowNum){
            $(".list:eq("+nowNum+")").animate({width:"80%",height:"80%"}).css("zIndex",0);
            $(".list:eq("+nextNum+")").animate({left:0},function(){
                $(".list:eq("+nowNum+")").css({width:"100%",height:"100%",left:"100%"})
                nowNum=nextNum;
            }).css("zIndex",1);
        }else if(nextNum<nowNum){
            $(".list:eq("+nowNum+")").animate({left:"100%"}).css("zIndex",1);
            $(".list").eq(nextNum).css({width:"80%",height:"80%",left:0}).animate({width:"100%",height:"100%"},function(){
                nowNum=nextNum;
            })
        }

    }

    $(".a-menu-detail-title").click(function(){
        $(this).next(".a-menu-detail-list").toggle(500);
        // $(this).css("color","red");
    })






})