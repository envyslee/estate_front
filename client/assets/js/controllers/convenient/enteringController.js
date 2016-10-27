/**
 * Created by dell on 2016/10/27.
 */

define([], function () {
  var enteringController = function ($scope, $stateParams, $state, $controller,commonService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    var from=$stateParams.from;
    if(from=='inFix'){
      $scope.title="室内报修";
    }else if(from=='wash'){
      $scope.title="洗衣服务";
    }else if(from=='housekeeping'){
      $scope.title="家政服务";
    }

  };
  enteringController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService'];
  app.register.controller('enteringController', enteringController);
});
