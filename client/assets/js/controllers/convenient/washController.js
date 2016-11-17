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

    $scope.goEnter=function () {
      $state.go('entering',{from:'wash',userId:$stateParams.userId});
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
      })
    }

  };
  washController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService','convenientService','FoundationApi'];
  app.register.controller('washController', washController);
});
