/**
 * Created by lixiaoqiang on 15/8/24.
 */

define([], function () {
  var verRejectController = function ($scope, $q, $stateParams, $state, $controller, $location, verRejectService, userService, commonService) {

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

      verRejectService.GetRejectMsg(openId, orderId).then(function (data) {
        $scope.datatime = data.nextApplyDate;
        $scope.counter = data.lastDay;
        defer.resolve('OK');
        $scope.isShow = true;
      }, function(e){
        defer.reject(e);
        $scope.isShow = false;
      });
      return defer.promise;
    }

    commonService.PageLoad(init);

  }

  //注入对象
  verRejectController.$inject = ['$scope', '$q', '$stateParams', '$state', '$controller', '$location', 'verRejectService', 'userService', 'commonService'];
  app.register.controller('verRejectController', verRejectController);
});
