/**
 * Created by dell on 2016/10/27.
 */
define([], function () {
  var outFixController = function ($scope, $stateParams, $state, $controller,commonService,convenientService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));


    $scope.outFixInit=function () {
      commonService.Loading();
      convenientService.GetOutFixList().then(function (data) {
        commonService.LoadingEnd();
        if(data.status==200){
          $scope.fixList=data.data;
        }else {
          alert('获取维修列表出错，请稍后再试');
        }
      },function (e) {
        commonService.LoadingEnd();
        alert('获取维修列表出错，请稍后再试');
      })
    }


  };
  outFixController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService','convenientService'];
  app.register.controller('outFixController', outFixController);
});
