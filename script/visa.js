$(function(){
    var $SliderImg=$('.SliderImg a'),
        $visaSlider=$('.visaSlider'),
        $nav=$('.sliderNavBox'),
        $navA=$('.sliderNavBox a'),
        timer=null,
        iNow=0,
        imgLen=$SliderImg.length,
        iDelay=1000,
        $asterisk=$('.visaHideNum'),
        $Update=$('.aUpdate'),
        $imgUpdate=$('.icoUpdate'),
        $imgSrc=$imgUpdate.attr('src'),
        len=$asterisk.size(),
        $SelectEventShow=$('.SelectEventShow'),
        $SelectEventHover=$('.SelectEventHover'),
        $curSelect=$('.curSelect'),
        $navTabs=$('.navTabs_tit'),
        $hotTitle=$('.hotTitle'),
        $curCity=$('.curCity'),
        $Region_city=$('.Region_city'),
        $cityEventHide=$('.cityEventHide'),
        $cityLi=$('.cityEventHide li'),
        $cityUl=$('.cityEventHide ul'),
        $navContents=$('.navContents');


    //点击更多事件
    $('.navMore').on('click',function(){
        if($(this).text()=='更多'){
            $(this).text('收起').prev().show();
        }else{
            $(this).text('更多').prev().hide();
        }
    });

    //轮播主容器鼠标事件
    $visaSlider.hover(function(){
        clearInterval(timer);
    },function(){
        timer=setInterval(move,iDelay)
    });
    //轮播导航鼠标事件
    $nav.on('mouseenter','a',function(){
        var nIndex = $(this).index();
        if(nIndex==iNow) return;
        iNow=nIndex;
        $(this).addClass('navCur').siblings().removeClass('navCur');
        $SliderImg.removeClass('on').eq(iNow).addClass('on');
    });
    //轮播动作
    function move(){
        if(++iNow > imgLen-1 ) iNow=0;
        $SliderImg.removeClass('on').eq(iNow).addClass('on');
        $navA.removeClass('navCur').eq(iNow).addClass('navCur');
    }
    timer=setInterval(move,iDelay);

    //设置星号
    var setAsterisk=function(){
        for(var i= 0; i<len; i++){
            var $asteriskTxt=$asterisk.eq(i).text();
            $asterisk.eq(i).text($asteriskTxt.replace($asteriskTxt.substr(3,4),'****'))
        }
    }();

    //导航切换
    $navTabs.on('click','a',function(){
        var nzIndex=$(this).index();
        $(this).addClass('titCur').siblings().removeClass('titCur');
        $navContents.removeClass('navOn').eq(nzIndex).addClass('navOn')
    });

//    显示城市下拉框
    $Region_city.on('click',function(e){
        e.stopPropagation();
        $cityEventHide.show();
        $SelectEventHover.hide();
    });
//    城市切换
    $hotTitle.on('click','a',function(e){
        e.stopPropagation();
        var nzIndex=$(this).index();
        $(this).addClass('cityCur').siblings().removeClass('cityCur');
        $cityLi.removeClass('cityOn').eq(nzIndex).addClass('cityOn')
    });

//    选择城市
    $cityUl.on('click','li a',function(e){
        e.stopPropagation();
        $curCity.text($(this).text());
        $cityEventHide.hide();
    });

// 下拉框显示
    $SelectEventShow.on('click',function(e){
        e.stopPropagation();
        $SelectEventHover.show();
        $cityEventHide.hide();
    });

// 下拉选择框
    $SelectEventHover.on('click','a',function(e){
        e.stopPropagation();
        $curSelect.text($(this).text());
        $SelectEventHover.hide();
        $cityEventHide.hide();
    });

//     隐藏下拉框
    $(document).click(function(){
        $cityEventHide.hide();
        $SelectEventHover.hide();
    });

//    刷新验证码
    $Update.click(function(){
        $imgUpdate.attr('src',$imgSrc+'?'+new Date().getTime())
    })
});
