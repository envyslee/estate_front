/**
 * Created by chengchao on 15/8/25.
 */
'use strict';
define([], function () {
  var social_gjjService = function (commonService) {

    var o2oapi = app.service.baseuri;
    var _openId = '';
    var _orderId = '';

    var _Init = function (user_info) {
      _openId = user_info.openId;
      _orderId = user_info.currentOrderId;
    }

    var _GetCity = function () {
      var url = 'assets/socialcity.json';
      return commonService.BaseGetRequest(url);
    };

    var _LoginInit = function (type, cityCode) {
      var url = (type == 1 ? app.service.gjjuri : app.service.socialuri) + 'init/' + cityCode + '/Json';
      return commonService.BaseGetRequest(url);
    }

    var _GetLoginParam = function (type, cityCode) {
      var url = (type == 1 ? app.service.gjjuri : app.service.socialuri) + 'formsetting/query/' + cityCode + '/Json';
      return commonService.BaseGetRequest(url);
    }

    var _NotFindCity = function (closeType) {
      var customerApi = app.service.baseuri + 'orderCust/';
      var url = customerApi + "closeOrderBySocial?openId=" + _openId + "&orderId=" + _orderId;
      return commonService.GetRequest(url);
    }

    var _GetCus = function () {
      var url = o2oapi + "orderCust/findCustByOrderId";
      var param = {
        'orderId': _orderId,
        'openId': _openId
      };
      return commonService.PostRequest(url, param);
    }

    var _Login = function (type, cityCode, data) {
      data.busType = 'LIRENDAIO2O';
      var url = (type == 1 ? app.service.gjjuri : app.service.socialuri) + 'login/' + cityCode + '/Json';
      return commonService.BasePostRequest(url, commonService.Encode(commonService.UTF162UTF8(JSON.stringify(data))));
    }

    var _InsertSocial = function (name) {
      var url = o2oapi + "orderCust/insertSocial";
      var param = {
        'orderId': _orderId,
        'openId': _openId,
        'name': name
      };
      return commonService.PostRequest(url, param);
    }

    return {
      GetCity: _GetCity,
      GetLoginParam: _GetLoginParam,
      LoginInit: _LoginInit,
      Init: _Init,
      NotFindCity: _NotFindCity,
      GetCus: _GetCus,
      Login: _Login,
      InsertSocial: _InsertSocial
    };
  };

  social_gjjService.$inject = ['commonService'];
  app.register.factory('social_gjjService', social_gjjService);
});
