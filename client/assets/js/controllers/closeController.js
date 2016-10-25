/**
 * Created by chengchao on 15/8/31.
 */
define([], function () {
  var closeController = function ($scope, $stateParams, $state, $controller, userService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    $scope.type = $stateParams.close_type;
    userService.ClearCache();
  };
  closeController.$inject = ['$scope', '$stateParams', '$state', '$controller', 'userService'];
  app.register.controller('closeController', closeController);
});
