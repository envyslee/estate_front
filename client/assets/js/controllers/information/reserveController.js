/**
 * Created by dell on 2016/10/26.
 */
define([], function () {
  var reserveController = function ($scope, $stateParams, $state, $controller,commonService,informationService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    $scope.menushow = false;
    $scope.toggleMenu = function () {
      $scope.menushow = !$scope.menushow;
    }

    $scope.reserve={
      name:'',
      phone:'',
      houseId:$stateParams.houseId
    }

    $scope.watchSubmit=function () {
      if(!commonService.CheckPhone($scope.reserve.phone)){
        alert('手机号不正确，请重新输入');
        return;
      }
      commonService.Loading();
        informationService.WatchHouse($scope.reserve).then(function (data) {
          commonService.LoadingEnd();
          if(data.status==200){
            alert('提交成功，我们的工作人员将尽快联系您看房');
            history.go(-1);
          }else {
            alert('提交出错，请稍后再试');
          }
        },function (e) {
          commonService.LoadingEnd();

        })
    }


  };
  reserveController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService','informationService'];
  app.register.controller('reserveController', reserveController);
});
