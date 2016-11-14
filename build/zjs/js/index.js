$(document).ready(function(e) {

 var nowpage = 0;
	//给class为container的容器加上触滑监听事件
	$(".pages-container").swipe(
		{
			swipe:function(event, direction, distance, duration, fingerCount) {//事件，方向，距离（像素为单位），时间，手指数量
				 if(direction == "up")//当向上滑动手指时令当前页面记数器加1
				 {
					nowpage = nowpage + 1;
				 }
				 else if(direction == "down")//当向下滑动手指时令当前页面记数器减1
				 {
					nowpage = nowpage - 1;
				 }

				 if(nowpage > 3)//因本实例只有4张图片，所以当记数器大于3时令他返回3（从0开始记），避免溢出出错
				 {
					nowpage = 3;
				 }

				 if(nowpage < 0)//道理同上
				 {
					nowpage = 0;
				 }
                 if(nowpage==3){
                     $(".next-page-arrow").hide();
                 }else{
                     $(".next-page-arrow").show();
                 }
				$(".pages-container").css("top",nowpage * -100 + "%");//根据当前记数器滚动到相应的高度
                $(".pages-container").children().removeClass("current");
                $($(".pages-container").children()[nowpage]).addClass("current");
			}
		}
	);
});
