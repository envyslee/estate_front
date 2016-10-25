/**
 * Created by dell on 2016/10/25.
 */
define([], function () {
  var userCenterController = function ($scope, $stateParams, $state, $controller,commonService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));


  };
  userCenterController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService'];
  app.register.controller('userCenterController', userCenterController);
});
