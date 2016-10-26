/**
 * Created by dell on 2016/10/26.
 */
define([], function () {
  var houseDetailController = function ($scope, $stateParams, $state, $controller,commonService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    $scope.menushow = false;
    $scope.toggleMenu = function () {
      $scope.menushow = !$scope.menushow;
    }


  };
  houseDetailController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService'];
  app.register.controller('houseDetailController', houseDetailController);
});
