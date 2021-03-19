$(".article1 .slide_group").slick({
    autoplay: false, // 자동재생
    autoplaySpeed: 3000, // 간격시간
    dots: true, // 동그라미버튼
    pauseOnFocus: false, // 동그라미번호버튼 클릭시 자동실행 멈춤여부
    prevArrow: '<button class="prev"><i class="fas fa-angle-left"></i></button>',
    nextArrow: '<button class="next"><i class="fas fa-angle-right"></i></button>',
})
$(".article3 .slide_group").slick({
    autoplay: false, // 자동재생
    autoplaySpeed: 3000, // 간격시간
    dots: true, // 동그라미버튼
    pauseOnFocus: false, // 동그라미번호버튼 클릭시 자동실행 멈춤여부
    prevArrow: '<button class="prev"><i class="fas fa-angle-left"></i></button>',
    nextArrow: '<button class="next"><i class="fas fa-angle-right"></i></button>',
})
$(".article5 .slide_group").slick({
    autoplay: false, // 자동재생
    autoplaySpeed: 3000, // 간격시간
    dots: true, // 동그라미버튼
    pauseOnFocus: false, // 동그라미번호버튼 클릭시 자동실행 멈춤여부
    prevArrow: '<button class="prev"><i class="fas fa-angle-left"></i></button>',
    nextArrow: '<button class="next"><i class="fas fa-angle-right"></i></button>',
})







$(window).on('scroll', function(){
    var sct = $(this).scrollTop()
    if (sct>=10 && !$('#header').hasClass('on')) {
        $('#header').addClass('on')
    } else if (sct<10 && $('#header').hasClass('on')) {
        $('#header').removeClass('on')
    }
})



$('#header .open').on('click', function(){
    $(this).removeClass('on')
    $(this).next().next().addClass('on')
    $(this).next().addClass('on')
  
})

$('#header .close').on('click', function(){
    $(this).removeClass('on')
    $(this).prev().prev().addClass('on')
    $(this).prev().removeClass('on')
    $(this).prev().find('.depth1 > li').removeClass('on')

})




// 여기서부터 resize 이벤트 발생시 스크롤바 유무에 따른 상태제어 프로그램
var deviceSize1 = 1024;    
var deviceSize2 = 768;

function scrollOX(status) {
    $('html').css({
        overflowY:status
    })
    var htmlWidth = $('html').width()
    return htmlWidth
}
var swh = scrollOX('hidden')
var sws = scrollOX('scroll')
var swd = swh - sws
if (swd>0) {
    deviceSize1 -= swd;
    deviceSize2 -= swd;
}

var ww;
function init(){
    ww = $(window).width()
    if (ww>deviceSize1 && !$('html').hasClass('pc') ) {
        $('html').addClass('pc').removeClass('tablet')
        $('html').scrollTop(0)
    } else if ( ww<=deviceSize1 && ww>deviceSize2 && !$('html').hasClass('tablet') ) {
        $('html').addClass('tablet').removeClass('pc mobile')
        $('html').scrollTop(0)
        $('.depth1 > li').removeClass('on')
    } else if ( ww<=deviceSize2 && !$('html').hasClass('mobile')) {
        $('html').addClass('mobile').removeClass('tablet')
        $('html').scrollTop(0)
        $('#nav').removeClass('on')
        $('#header .close').removeClass('on')
        $('#header .open').addClass('on')
    }
}

init()

$(window).on('resize', function(){
    init()
})

// 여기까지 resize 이벤트 발생시 스크롤바 유무에 따른 상태제어 프로그램

$('.depth1 > li').hover(
    function(){
        if ( $('html').hasClass('pc') || $('html').hasClass('tablet') ) {
            $(this).addClass('on')
            $(this).find('.depth2').css({
                opacity:0
            }).animate({
                opacity:1
            }, 200)
        }
    },
    function(){
        if ( $('html').hasClass('pc') || $('html').hasClass('tablet') ) {
            $(this).find('.depth2').animate({
                opacity:0
            }, 5000), function(){
                $(this).parent().removeClass('on')
            }
            
        }
    }
)

$('.depth1 > li').on('click', function(e){
    if ( $('html').hasClass('mobile') ) {
        e.preventDefault()
        $(this).toggleClass('on').siblings().removeClass('on')
    }
})

$('.depth2 > li').on('click', function(e){
    e.stopPropagation()
})


$('.article').on('mousewheel', function(e, delta){
    // 0보다 크면 위로, 0보다 작으면 아래로
    if(delta>0){
        var prev = $(this).prev().offset().top
        $('html').stop().animate({
            scrollTop:prev
        }, 500,  'linear')
    } else if (delta<0) {
        var next = $(this).next().offset().top
        $('html').stop().animate({
            scrollTop:next
        }, 500, 'linear')
    }
})



var article2Near = $('.article2').offset().top - (wh/2+100)
var article3Near = $('.article3').offset().top - (wh/2+100)
var article6Near = $('.article6').offset().top - (wh/2+100)
$(window).on('scroll', function(){
    var sct = $(this).scrollTop()
    if ( sct>=50 && !$('#header').hasClass('on') ) {
        $('#header').addClass('on')
    } else if ( sct<50 && $('#header').hasClass('on') ) {
        $('#header').removeClass('on')
    }

    // article2 
    if ( sct >= article2Near && !$('.article2').hasClass('on') ) {
        $('.article2').addClass('on')
    } else if ( sct===0 ) {
        $('.article2').removeClass('on')
    }

    // article3 
    if ( sct >= article3Near && !$('.article3').hasClass('on')  ) {
        $('.article3').addClass('on')
    } else if ( sct===0 ) {
        $('.article3').removeClass('on')
    }

    if ( sct>=article6Near && $('.article6').hasClass('on') ) {
        $('.article6').addClass('on')
        filter('all')
    } 


})

//imges

var elLia = document.querySelectorAll('.imgPage .title > li > a')
var elImg = document.querySelectorAll('.imgPage .cont > img')
for (var i=0; i<elLia.length; i++) {
    elLia[i].addEventListener('click', function(e){
        e.preventDefault()
        var href = this.getAttribute('href')
        filter(href)
    })
}
function filter(type){
    for (var j=0; j<elImg.length; j++) {
        if ( elImg[j].classList.contains(type) ) {
            elImg[j].style.display = 'block'
            elImg[j].classList.add('active')
        } else {
            elImg[j].classList.remove('active')
            elImg[j].style.display = 'none'
        }
    }
}

// var href;
// $('.article .title a').on('click', function(e){
//     e.preventDefault()
//     href = $(this).attr('href')
//     $('.cont img').each(function(){
//         if ( $(this).hasClass(href) ) {
//             $(this).css({display:'block'})
//             $(this).addClass('active')
//         } else {
//             $(this).removeClass('active')
//             .css({display:'none'})
//         }
//     })
// })

