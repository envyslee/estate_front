/**
 * Created by lixiaoqiang on 15/8/24.
 */

define([], function () {
  var crdRegSuccessController = function ($scope, $stateParams, $state, $controller) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    $scope.pre = function () {
      $state.go('crdLogin');
    }
  }

  crdRegSuccessController.$inject = ['$scope', '$stateParams', '$state', '$controller'];
  app.register.controller('crdRegSuccessController', crdRegSuccessController);
});
