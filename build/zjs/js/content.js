$(document).ready(function(e) {
  function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null){
      return  unescape(r[2]);
    }
    return null;
  }

  var queryStrings = GetQueryString("imagePath");;
  var path = queryStrings!=null ? queryStrings.replace(new RegExp(/(%2F)/g),'/'): "http://liren.vcash.cn/images/qcr.jpg";
  //分享描述
  var title = $('title').text();

  var timestamp;
  var nonceStr;
  var signature;
  var imgUrl = 'http://wap.vcash.cn/lrd/assets/images/logo.png';
  var link = window.location.href;

  if(path !=null && path.toString().length>1) {
    $("#img-ma").attr("src",path);
  }

  $.ajax({
    type : "POST",
    url : "http://www.vcash.cn/wx-search/json/wxconfig.action",
    dataType : "json",
    data:{"url":link},
    timeout: 20000,
    cache: false,
    async: true,
    success : function(response) {

      timestamp = response.timestamp;
      nonceStr = response.noncestr;
      signature = response.signature;

      wx.config({
        debug: false,
        appId: "wx31f41ad1e0b80f91",
        timestamp: timestamp,
        nonceStr: nonceStr,
        signature: signature,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
      });

      wx.ready(function(){
        wx.onMenuShareTimeline({
          title: title,//'女性专属信用贷款，有卡就能贷！', // 分享标题
          link:link,
          imgUrl: imgUrl // 分享图标
        });
        wx.onMenuShareAppMessage({
          title: '丽人贷', // 分享标题
          desc:title,// "女性专属信用贷款，有卡就能贷！", // 分享描述
          link:link,//link,
          imgUrl: imgUrl, // 分享图标
          type: 'link' // 分享类型,music、video或link，不填默认为link
        });
      });

    },
    error : function() {
      alert('系统繁忙,请稍后再试');
    }
  });
});
