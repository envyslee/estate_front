/**
 * Created by lixiaoqiang on 15/8/24.
 */

'use strict';
define([], function () {
  var verSuccessService = function (commonService) {

    /**获取返回信息*/
    var _GetSuccessMsg = function (openId, orderId) {
      var url = app.service.baseuri + "query/verSuccess?openId=" + openId + "&orderId=" + orderId;
      return commonService.GetRequest(url);
    }

    return {
      GetSuccessMsg: _GetSuccessMsg
    }
  };
  verSuccessService.$inject = ['commonService'];
  app.register.factory('verSuccessService', verSuccessService);
});
