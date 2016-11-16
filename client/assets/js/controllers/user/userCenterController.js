/**
 * Created by dell on 2016/10/25.
 */
define([], function () {
  var userCenterController = function ($scope, $stateParams, $state, $controller,commonService,userService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));


    $scope.userCenterInit=function () {
      $scope.nickName=sessionStorage.getItem('nickName');
    }


    $scope.logout=function () {
      userService.Logout().then(function () {
        $state.go('login');
      },function () {
        $state.go('login');
      });
    }


  };
  userCenterController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService','userService'];
  app.register.controller('userCenterController', userCenterController);
});
