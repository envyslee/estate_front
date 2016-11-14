/**
 * Created by dell on 2016/10/26.
 */
define([], function () {
  var inController = function ($scope, $stateParams, $state, $controller,commonService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    $scope.title= $stateParams.type=='buy'?'我要买房':'我要租房';

    $scope.menushow = false;
    $scope.toggleMenu = function () {
      $scope.menushow = !$scope.menushow;
    }


  };
  inController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService'];
  app.register.controller('inController', inController);
});
