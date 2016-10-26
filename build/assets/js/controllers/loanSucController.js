/**
 * Created by lixiaoqiang on 15/8/24.
 */

define([], function () {
  var loanSucController = function ($scope, $q, $stateParams, $state, $controller, $location, loanSucService, userService, commonService) {

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
    $scope.isCode = 0;


    var init = function(){
      var defer = $q.defer();
      loanSucService.GetSuccess(openId, orderId).then(function (data) {
        $scope.store = data;
        if(data.agentName != null || data.agentMobile != null ){
          $scope.isCode = 1;
        }
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
  loanSucController.$inject = ['$scope', '$q', '$stateParams', '$state', '$controller', '$location', 'loanSucService', 'userService', 'commonService'];
  app.register.controller('loanSucController', loanSucController);
});
