/**
 * Created by lixiaoqiang on 15/8/24.
 */

define([], function () {
  var verSuccessController = function ($scope, $q, $stateParams, $state, $controller, $location, verSuccessService, userService, commonService) {

    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));


    //得到USER
    var userSession = userService.GetUser();
    var openId = userSession.openId;
    var orderId = userSession.currentOrderId;
    $scope.isShow = false;

    var init = function () {
      var defer = $q.defer();

      verSuccessService.GetSuccessMsg(openId, orderId).then(function (data) {
        $scope.success = data;
        defer.resolve('OK');
        $scope.isShow = true;
      }, function (e) {
        defer.reject(e);
        $scope.isShow = false;
      });
      return defer.promise;
    }

    commonService.PageLoad(init);

  }

  //注入对象
  verSuccessController.$inject = ['$scope', '$q', '$stateParams', '$state', '$controller', '$location', 'verSuccessService', 'userService', 'commonService'];
  app.register.controller('verSuccessController', verSuccessController);
});
