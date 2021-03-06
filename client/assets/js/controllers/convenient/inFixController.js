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

    $scope.goEnter=function (typeId) {
      $state.go('entering',{from:'inFix',typeId:typeId});
    }

    $scope.openPmIf=function () {
      if(feeTag){
        FoundationApi.publish('priceModalIf','open');
      }else {
        alert('获取价格出错，请稍后再试');
      }
    }

    $scope.ifInit=function () {
      convenientService.GetPrice(1).then(function (data) {
        if(data.status!=200){
          feeTag=false;
        }else{
          $scope.priceInfo=data.data;
        }
      },function () {
        feeTag=false;
      });

      convenientService.GetServerList(1).then(function (d) {
        if(d.status==200){
          $scope.serverList=d.data;
        }else{
          alert('获取数据失败，请稍后再试');
        }
      },function (e) {
        alert('获取数据失败，请稍后再试');
      })

    }
  };
  inFixController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService','convenientService','FoundationApi'];
  app.register.controller('inFixController', inFixController);
});
