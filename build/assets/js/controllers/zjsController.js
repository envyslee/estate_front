
define([], function () {
  var zjsController = function ($scope, $stateParams, $state, $controller, $location, zjsService, userService,commonService) {

    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    if($stateParams.openId == '999'){
      commonService.ErrorNotify();
    }
    $scope.click = function () {
      $location.url('zjs_login/'+$stateParams.openId);
      //$state.go('zjs', {data: $stateParams.openId});
    }

    $scope.pre = function () {
      console.log($stateParams.openId);
      $location.url('zjs_login/'+$stateParams.openId);
    }

  }

  //注入对象
  zjsController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'zjsService', 'userService','commonService'];
  app.register.controller('zjsController', zjsController);
});
