/**
 * Created by dell on 2016/10/27.
 */
define([], function () {
  var washController = function ($scope, $stateParams, $state, $controller,commonService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    $scope.goEnter=function () {
      $state.go('entering',{from:'wash',userId:$stateParams.userId});
    }

  };
  washController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService'];
  app.register.controller('washController', washController);
});
