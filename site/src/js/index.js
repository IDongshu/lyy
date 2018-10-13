
//每过30秒 将当前的东西设置为current list-item,其他不设置，
$lunbo= $(".banner-slider .b-slider li");
$dot =$(".b-dot ul li");
$prev=$(".prev");
$next=$(".next");

$len=$lunbo.length;
var i=0;
   

function autoPlay(){
    if(i>=$len){
        i=0;
    }
    if(i<0){
        i=3;
    }

    $lunbo.eq(i).addClass('current').fadeIn();
    $dot.eq(i).addClass('on');
    $lunbo.eq(i).siblings('li').removeClass('current').fadeOut();
    $dot.eq(i).siblings('li').removeClass('on');
    i++;
 
}
var timer=setInterval(function(){
    autoPlay();
},2500);

// $prev.on('click',function(){
//     clearInterval(timer);
//     if(i>0){
//         i=i-2; 
//     }else if(i<=0){
//         i=3;
//     }
//     autoPlay();     
// });
// $next.on('click',function(){
//     clearInterval(timer);
//     if(i<=0){
//         i=i+1;
//     }else if(i>=($len)){
//         i=0;
//     }
//     autoPlay();
// });

        




