/**
 * Created by dell on 2016/10/25.
 */
define([], function () {
  var findPasswordController = function ($scope, $stateParams, $state, $controller,commonService,FoundationApi) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    $scope.verifyInfo=function () {
      FoundationApi.publish('resetModal', 'open');
    }

  };
  findPasswordController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService','FoundationApi'];
  app.register.controller('findPasswordController', findPasswordController);
});
