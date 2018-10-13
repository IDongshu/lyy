var header = document.querySelector(".header");
// console.log(header);

var goTop=document.querySelector(".goTop");
// 吸顶
// goTop回滚
window.onscroll = function(){
    if(window.scrollY >500){
        goTop.style.display = "block";
    }else if(window.scrollY <=500){
        goTop.style.display = "none";
        if(window.scrollY<=30 ){
            header.classList.remove("header_fixed");
        }else if(window.scrollY >30){
            header.classList.add("header_fixed");
        }
    }
}
goTop.onclick = function(){
    var timer = setInterval(function(){//设置定时器
    var speed = parseInt(window.scrollY/10);
    if(speed <= 20){
        speed = 10;
    }
    if(window.scrollY <= 0){//清除定时器
        clearInterval(timer);
    }
    window.scrollBy(0,-speed);
    },30)
}

//二三级导航
var yiji = document.querySelector(".catalogs-title");
var erji = document.querySelector(".catalogs-list");
var item = document.querySelectorAll(".item");
// console.log(item);
yiji.onclick=function(){
    erji.classList.toggle('block');
}
for(let i=0;i<item.length;i++){
    item[i].onmouseover=function(){
        item[i].classList.add('current');
        item[i].children[1].style.display="block";
    }
    item[i].onmouseout=function(){
        item[i].classList.remove('current');
        item[i].children[1].style.display="none";
    }
}

