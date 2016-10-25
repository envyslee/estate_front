/**
 * Created by lixiaoqiang on 15/8/24.
 */

'use strict';
define([], function () {
  var verRejectService = function (commonService) {

    /**获取返回信息*/
    var _GetRejectMsg = function (openId, orderId) {
      var url = app.service.baseuri + "query/reject?openId=" + openId + "&orderId=" + orderId;
      return commonService.GetRequest(url);
    }

    return {
      GetRejectMsg: _GetRejectMsg
    }
  };
  verRejectService.$inject = ['commonService'];
  app.register.factory('verRejectService', verRejectService);
});
