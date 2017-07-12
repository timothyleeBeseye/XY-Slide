$(function(){
    (function(){
        var app={
            touchStart:[0,0],
            touchEnd:[0,0],
            touch:function(e){
                return e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            }
        }

        $('#app')
        .on('touchstart',function(e){
            var touch = app.touch(e);
            app.touchStart[0]=touch.pageX
            app.touchStart[1]=touch.pageY
        })
        .on('touchmove',function(e){
            var touch = app.touch(e);
            if(Math.abs(touch.pageY-app.touchStart[1])>=10){
                console.log(touch.pageY-app.touchStart[1]-10)
                $('.bot-page').css({top:160+touch.pageY-app.touchStart[1]-10})
            }
        })
        .on('touchend',function(e){
            var touch = app.touch(e);
            app.touchEnd[0]=touch.pageX
            app.touchEnd[1]=touch.pageY
        })

        $(window)
        .on('wheel',function(){

        })

        
    })()
})