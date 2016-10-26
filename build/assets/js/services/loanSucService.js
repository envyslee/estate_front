/**
 * Created by lixiaoqiang on 15/8/24.
 */

'use strict';
define([], function () {
  var loanSucService = function (commonService) {

    /**获取生成信息*/
    var _GetSuccess = function (openId, orderId) {
      var url = app.service.baseuri + "query/success?openId=" + openId + "&orderId=" + orderId;
      return commonService.GetRequest(url);
    }

    return {
      GetSuccess: _GetSuccess
    }
  };
  loanSucService.$inject = ['commonService'];
  app.register.factory('loanSucService', loanSucService);
});
