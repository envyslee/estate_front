/**
 * Created by chengchao on 15/5/26.
 */
'use strict';
define([], function () {
  var homeService = function (commonService) {
    var getCurrentState = function (openId) {
      var url = app.service.baseuri + "loan?openId=" + openId;
      return commonService.GetRequest(url);
    };

    var process = function (proceContent) {
      switch (proceContent.orderStatus) {
        case 10:
          return "cus";
        case 20:
          switch (proceContent.creditStatus) {
            case 1:
              return 'crdLogin';
            case 2:
              return 'crdLogin';
            case 3:
              return 'crdIndex';
            case 4:
              return 'crdloading';
            default:
              return 'crdRoute';
          }
          break;
        case 30:
          return "social_gjj";
        case 40:
          return "limit";
        case 50:
          return "store";
        case 60:
          return "loan_success";
        case 65:
          return "loan_success";
        case 70:
          return "ver_success";
          break;
        case 80:
          return "ver_reject";
          break;
      }
    }

    return {
      GetCurrentState: getCurrentState,
      Process: process
    };
  };

  homeService.$inject = ['commonService'];
  app.register.factory('homeService', homeService);
});

