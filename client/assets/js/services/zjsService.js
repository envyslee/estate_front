'use strict';
define([], function () {
  var zjsService = function (commonService) {

    //經辦人登陸
    var queryAgent = function (userName, pwd, openId) {
      //openId从session中获取  后台校验是否有值
        //var url = app.service.baseuri + "loan/zjs?userName=" + userName + "&pwd=" + pwd + "&openId=" + openId;
      var url = app.service.baseuri + "loan/zjs?openId=" + openId;
      var user = {"userName":userName, "pwd":pwd};
      return commonService.PostRequest(url, user);
    }

    //用户列表请求数据
    var queryContentList = function(){
      var url = "assets/listShare.json";
      return commonService.GetShareList(url);
    }

    return {
      queryAgent: queryAgent,
      queryContentList:queryContentList
    };
  };

  zjsService.$inject = ['commonService'];
  app.register.factory('zjsService', zjsService);
});

