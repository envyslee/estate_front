/**
 * Created by chengchao on 15/5/26.
 */
'use strict';
define([], function () {
  var cusService = function (commonService, $q) {

    var _openId = '';
    var customerApi = app.service.baseuri + 'orderCust/';

    var _Init = function (openId) {
      _openId = openId;
    }

    var _GetAllProvince = function () {
      var url = customerApi + "getAllProvince?openId=" + _openId;
      return commonService.GetRequest(url);
    };

    //检查本地是否有门店
    var _CheckStore = function (cus, cityName) {
      var url = customerApi + "checkStore?openId=" + _openId + "&cityName=" + cityName;
      return commonService.PostRequest(url, cus);
    };

    //检验身份证
    var _CheckIdCard = function (cus) {
      var url = customerApi + "checkCards?openId=" + _openId;
      return commonService.PostRequest(url, cus);
    };

    //获取短信验证码
    var _SendVerifyCode = function (mobile) {
      var url = customerApi + "getTelCode?openId=" + _openId + "&custModel=" + mobile;
      return commonService.GetRequest(url);
    };

    //关闭订单
    var _CloseOrder = function (cus, closeType) {
      var url = customerApi + "closeOrder?openId=" + _openId + "&closeType=" + closeType;
      return commonService.PostRequest(url, cus);
    }

    //校验手机验证码
    var _CheckTelCode = function (code, cus) {
      var url = customerApi + "checkCode?openId=" + _openId + "&code=" + code;
      return commonService.PostRequest(url, cus);
    }

    //提交（update）
    var _UpdateCus = function (cus) {
      var url = customerApi + "update?openId=" + _openId;
      return commonService.PostRequest(url, cus);
    }

    return {
      Init: _Init,
      GetAllProvince: _GetAllProvince,
      CheckStore: _CheckStore,
      CheckIdCard: _CheckIdCard,
      SendVerifyCode: _SendVerifyCode,
      CloseOrder: _CloseOrder,
      UpdateCus: _UpdateCus,
      CheckTelCode: _CheckTelCode
    };
  };

  cusService.$inject = ['commonService', '$q'];
  app.register.factory('cusService', cusService);
});

