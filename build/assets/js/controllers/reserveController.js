/**
 * Created by dell on 2016/10/26.
 */
define([], function () {
  var reserveController = function ($scope, $stateParams, $state, $controller,commonService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    $scope.menushow = false;
    $scope.toggleMenu = function () {
      $scope.menushow = !$scope.menushow;
    }

    $scope.reserve={
      name:'',
      phone:''
    }


  };
  reserveController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService'];
  app.register.controller('reserveController', reserveController);
});
