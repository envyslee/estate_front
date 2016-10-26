/*$().ready(function(){
    console.log("document ready");
});*/


var count = $('.page').length;

function nextPageAction(currentPage){
    var nextPage = currentPage.next();
    currentPage.removeClass("current");
    currentPage.addClass("prev");
    nextPage.removeClass("next");
    nextPage.addClass("current");
    if(nextPage.index() + 1 == count){
        $(".next-page-arrow").hide();
    }
}
function prevPageAction(currentPage){
    var prevPage = currentPage.prev();
    currentPage.removeClass("current");
    currentPage.addClass("next");
    prevPage.removeClass("prev");
    prevPage.addClass("current");
    if(currentPage.index() < count){
        $(".next-page-arrow").show();
    }
}

touch.on('.page', 'swipedown', function(ev){
    //console.log("swipeup",ev.type);
    var currentPage = $("section.current");
    var prevPage = currentPage.prev();
    if(currentPage.index() == 0){
        return;
    }
    currentPage.animate({
        top:"100%"
    },1500,"swing",function(){
        prevPageAction(currentPage);
    });
    prevPage.animate({top:"0%"},1500,"swing");
});
touch.on('.page','swipeup',function(ev){
    //console.log("swipedown", ev.type);
    console.log("swipeUp");
    var currentPage = $("section.current");
    var nextPage = currentPage.next();

    if (currentPage.index() + 1 == count){
        return;
    }
    currentPage.animate({
        top:"-100%"
    },1500,"swing",function(){
        nextPageAction(currentPage);
    });

    nextPage.animate({top:"0%"},1500,"swing");
});