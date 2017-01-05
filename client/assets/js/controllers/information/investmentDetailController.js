/**
 * Created by dell on 2017/1/5.
 */
define([], function () {
  var investmentDetailController = function ($scope, $stateParams, $state, $controller) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    $scope.content=sessionStorage.getItem('content');

  };
  investmentDetailController.$inject = ['$scope','$stateParams', '$state', '$controller'];
  app.register.controller('investmentDetailController', investmentDetailController);
});
