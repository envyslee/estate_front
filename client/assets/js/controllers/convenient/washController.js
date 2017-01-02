/**
 * Created by dell on 2016/10/27.
 */
define([], function () {
  var washController = function ($scope, $stateParams, $state, $controller,commonService,convenientService,FoundationApi) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    var feeTag=true;

    $scope.goEnter=function (id) {
      $state.go('entering',{from:'wash',typeId:id});
    }

    $scope.openPmWs=function () {
      if(feeTag){
        FoundationApi.publish('priceModalWs','open');
      }else {
        alert('获取价格出错，请稍后再试');
      }
    }

    $scope.wsInit=function () {
      convenientService.GetPrice(3).then(function (data) {
        if(data.status!=200){
          feeTag=false;
        }else{
          $scope.priceInfo=data.data;
        }
      },function () {
        feeTag=false;
      });

      convenientService.GetServerList(3).then(function (d) {
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
  washController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService','convenientService','FoundationApi'];
  app.register.controller('washController', washController);
});
