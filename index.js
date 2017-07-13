$(function() {
    (function() {
        var app = {
            touchStart: [0, 0],
            touchEnd: [0, 0],
            initialTop: 0,
            initialLeft: 0,
            touch: function(e) {
                return e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            }
        }
        $('.slide').each(function(i) {
            $('#page-bar').find('ul').append('<li>●</li>')
        })
        pageBar(0)
        $('#app')
            .on('touchstart', function(e) {
                var touch = app.touch(e);
                app.touchStart[0] = touch.pageX
                app.touchStart[1] = touch.pageY
                app.initialTop = $(this).scrollTop()
                app.initialLeft = $('.X-slide').scrollLeft()
            })
            .on('touchmove', function(e) {
                e.preventDefault()
                var touch = app.touch(e),
                    ymove = app.touchStart[1] - touch.pageY
                $(this).scrollTop(app.initialTop + ymove)
            })
            .on('touchend', function(e) {
                var touch = app.touch(e);
                app.touchEnd[0] = touch.pageX
                app.touchEnd[1] = touch.pageY
                adjustY()
                adjustX()
            })

        $('.X-slide')
            .on('touchmove', function(e) {
                e.preventDefault()
                var touch = app.touch(e),
                    xmove = app.touchStart[0] - touch.pageX
                $(this).scrollLeft(app.initialLeft + xmove)
            })

        $(window)
            .on('wheel', function(e) {
                if (!isMobile()) {
                    scrollY(e.originalEvent.deltaY)
                } else {
                    var slideHeight = $('.slide').height(),
                        scrollTop = $('#app').scrollTop()
                    if (e.originalEvent.deltaY < 0) {
                        // if(page==1)
                        //     page--;
                        pageBar(0)
                        $('#app').stop().animate({ scrollTop: 0 * slideHeight })
                    } else if (e.originalEvent.deltaY > 0) {
                        // if(page==0)
                        //     page++;
                        $('#app').stop().animate({ scrollTop: 1 * slideHeight })
                    }
                }
            })

        function pageBar(num) {
            var lis = $('#page-bar').find('li')
            if(isMobile())
                lis.css({ fontSize: '12px' }).eq(num).css({ fontSize: '16px' })
            else
                lis.css({ fontSize: '15px' }).eq(num).css({ fontSize: '21px' })
        }
        function isMobile() {
            if (window.innerWidth <= 596)
                return true
            else
                return false
        }
        //pc
        var scrollY = function(deltaY) {
                var slideHeight = $('.slide').height(),
                    scrollTop = $('#app').scrollTop(),
                    page = Math.round(scrollTop / slideHeight)
                if (deltaY < 0) {
                    if (page != 0)
                        page--
                        pageBar(page)
                    $('#app').stop().animate({ scrollTop: page * slideHeight })
                } else if (deltaY > 0) {
                    page++
                    pageBar(page)
                    $('#app').stop().animate({ scrollTop: page * slideHeight })
                }
            }
            //mobile,pc
        var adjustY = function() {
            var slideHeight = $('.slide').height(),
                scrollTop = $('#app').scrollTop(),
                page = 0
            if (app.touchEnd[1] - app.touchStart[1] > 0) //up
                page = Math.round(scrollTop / slideHeight - 0.35)
            else if (app.touchEnd[1] - app.touchStart[1] < 0)//down
                page = Math.round(scrollTop / slideHeight + 0.35)
            $('#app').stop()
                .animate({ scrollTop: page * slideHeight }, function() {})
        }
        var adjustX = function() {
                var slideWidth = $('.slide').width(),
                    scrollLeft = $('.X-slide').scrollLeft(),
                    page = 0
                if (app.touchEnd[0] - app.touchStart[0] > 0) //left
                    page = Math.round(scrollLeft / slideWidth - 0.35)
                else if (app.touchEnd[0] - app.touchStart[0] < 0)//right
                    page = Math.round(scrollLeft / slideWidth + 0.35)
                pageBar(page)
                $('.X-slide').stop().animate({ scrollLeft: page * slideWidth })
            }
    })()
})
