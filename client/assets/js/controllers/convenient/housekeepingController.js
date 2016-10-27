/**
 * Created by dell on 2016/10/27.
 */
define([], function () {
  var housekeepingController = function ($scope, $stateParams, $state, $controller,commonService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));


    $scope.goEnter=function () {
      $state.go('entering',{from:'housekeeping',userId:$stateParams.userId});
    }
  };
  housekeepingController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService'];
  app.register.controller('housekeepingController', housekeepingController);
});
