/**
 * Created by dell on 2016/10/27.
 */
define([], function () {
  var inFixController = function ($scope, $stateParams, $state, $controller,commonService,convenientService,FoundationApi) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    var feeTag=true;

    $scope.goEnter=function () {
      $state.go('entering',{from:'inFix',userId:$stateParams.userId});
    }

    $scope.openPmIf=function () {
      if(feeTag){
        FoundationApi.publish('priceModalIf','open');
      }else {
        alert('获取价格出错，请稍后再试');
      }
    }

    $scope.ifInit=function () {
      convenientService.GetPrice(2).then(function (data) {
        if(data.status!=200){
          feeTag=false;
        }else{
          $scope.priceInfo=data.data;
        }
      },function () {
        feeTag=false;
      })
    }
  };
  inFixController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService','convenientService','FoundationApi'];
  app.register.controller('inFixController', inFixController);
});
