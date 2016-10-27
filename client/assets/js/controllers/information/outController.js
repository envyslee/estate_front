/**
 * Created by dell on 2016/10/26.
 */
define([], function () {
  var outController = function ($scope, $stateParams, $state, $controller,commonService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    $scope.title= $stateParams.type=='sale'?'我要卖房':'我要出租';

    $scope.menushow = false;
    $scope.toggleMenu = function () {
      $scope.menushow = !$scope.menushow;
    }

    $scope.uploadImg = function () {
      var file = event.target.files[0].name;
      alert('选择的文件名称：'+file);
    }


  };
  outController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService'];
  app.register.controller('outController', outController);
});
