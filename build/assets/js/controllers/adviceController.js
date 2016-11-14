/**
 * Created by dell on 2016/10/25.
 */

define([], function () {
  var adviceController = function ($scope, $stateParams, $state, $controller,commonService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));
  

  };
  adviceController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService'];
  app.register.controller('adviceController', adviceController);
});

