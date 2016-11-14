/**
 * Created by dell on 2016/10/27.
 */
define([], function () {
  var outFixController = function ($scope, $stateParams, $state, $controller,commonService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));


  };
  outFixController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService'];
  app.register.controller('outFixController', outFixController);
});
