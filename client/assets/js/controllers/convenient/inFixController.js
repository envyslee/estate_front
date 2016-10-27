/**
 * Created by dell on 2016/10/27.
 */
define([], function () {
  var inFixController = function ($scope, $stateParams, $state, $controller,commonService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));


    $scope.goEnter=function () {
      $state.go('entering',{from:'inFix',userId:$stateParams.userId});
    }
  };
  inFixController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService'];
  app.register.controller('inFixController', inFixController);
});
