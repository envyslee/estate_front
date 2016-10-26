/**
 * Created by zhangyile on 15/5/26.
 */
'use strict';
define([], function () {
  var limitService = function (commonService) {

    var _openId = 0;
    var _orderId = 0;
    var api = app.service.baseuri + "orderCust/";

    var _Init = function (openId, orderId) {
        _openId = openId;
        _orderId = orderId;
    }

    //更新状态跳转到门店
    var _Next = function () {
      var url = api + "updateStore?openId=" + _openId + "&orderId=" + _orderId;
      return commonService.GetRequest(url);
    };

    //获取额度
    var _PreReview = function () {
      var url = api + "prereview?openId=" + _openId + "&orderId=" + _orderId;
      return commonService.GetRequest(url);
    };

    return {
      Init: _Init,
      PreReview: _PreReview,
      Next: _Next
    };
  };
  limitService.$inject = ['commonService'];
  app.register.factory('limitService', limitService);
});

