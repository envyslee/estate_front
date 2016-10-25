/**
 * Created by dell on 2016/10/25.
 */
define([], function () {
  var loginController = function ($scope, $stateParams, $state, $controller,commonService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    $scope.login={
      phone:'',
      password:''
    }


  };
  loginController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService'];
  app.register.controller('loginController', loginController);
});
