/**
 * Created by dell on 2016/10/25.
 */
define([], function () {
  var registerController = function ($scope, $stateParams, $state, $controller,commonService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    var type=$stateParams.type;
    if(type=='register'){
      $scope.title='用户注册';
    }else if(type=='modify') {
      $scope.title='信息修改';
    }

  };
  registerController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService'];
  app.register.controller('registerController', registerController);
});
