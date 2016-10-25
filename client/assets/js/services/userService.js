/**
 * Created by chengchao on 15/8/24.
 */

'use strict';
define([], function () {
  var userService = function (commonService, $q) {
    var o2oapi = app.service.baseuri;

    function getUser() {
      return JSON.parse(sessionStorage.getItem('user_info'));
    };

    function cacheUser(user_info) {
      if (sessionStorage.getItem('user_info') != null) {
        sessionStorage.removeItem('user_info');
      }
      sessionStorage.setItem('user_info', JSON.stringify(user_info));
    };

    function cacheToken(token) {
      if (sessionStorage.getItem('token') != null) {
        sessionStorage.removeItem('token');
      }
      sessionStorage.setItem('token', token);
    };
    function getToken() {
      return sessionStorage.getItem('token');

    }

    function cacheCust(cust) {
      if (sessionStorage.getItem('cust') != null) {
        sessionStorage.removeItem('cust');
      }
      sessionStorage.setItem('cust', JSON.stringify(cust));
    };
    function getCust() {
      var defer = $q.defer();
      var cust = sessionStorage.getItem('cust');
      if (!cust) {
        var url = o2oapi + "orderCust/findCustByOrderId";
        var param = {
          'orderId': getUser().currentOrderId,
          'openId': getUser().openId
        };
        commonService.PostRequest(url, param).then(function (json) {
          cacheCust(json);
          defer.resolve(json);
        }, function (e) {
          defer.reject(e);
        });
      } else {
        defer.resolve(JSON.parse(cust));
      }

      return defer.promise;
    }

    var _ClearCache = function () {
      angular.forEach(['user_info', 'cust', 'token'], function (key) {
        if (sessionStorage.getItem(key)) {
          sessionStorage.removeItem(key);
        }
      });
    }

    return {
      GetUser: getUser,
      CacheUser: cacheUser,
      GetToken: getToken,
      CacheToken: cacheToken,
      GetCust: getCust,
      CacheCust: cacheCust,
      ClearCache: _ClearCache
    }
  };
  userService.$inject = ['commonService', '$q'];
  app.register.factory('userService', userService);
});
