/**
 * Created by lixiaoqiang on 15/5/26.
 */
'use strict';
define([], function () {
  var storeService = function (commonService) {

    //取得門店信息
    var getStoreInfo = function(orderId, openId){
      var url = app.service.baseuri + "query/store?openId=" + openId + "&orderId=" + orderId;
      return commonService.GetRequest(url);
    };

    //获取订单状态
    var getCurrentState = function (openId, orderId) {
      var url = app.service.baseuri + "query/store?openId=" + openId + "&orderId=1" ;
      return commonService.GetRequest(url);
    };

    /**提交订单*/
    var submitOrder = function(order){
      var url = app.service.baseuri + "query/submitOrder";
      return commonService.PostRequest(url, order);
    }

    return {
      getStoreInfo : getStoreInfo,
      SubmitOrder : submitOrder,
      GetCurrentState: getCurrentState
    };
  };

  storeService.$inject = ['commonService'];
  app.register.factory('storeService', storeService);
});

