/**
 * Created by dell on 2016/10/27.
 */
define([], function () {
  var housekeepingController = function ($scope, $stateParams, $state, $controller,commonService,convenientService,FoundationApi) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));


    var feeTag=true;

    $scope.goEnter=function () {
        $state.go('entering',{from:'housekeeping',userId:$stateParams.userId});
    }

    $scope.openPM=function () {
      if(feeTag){
        FoundationApi.publish('priceModal','open');
      }else {
        alert('获取价格出错，请稍后再试');
      }
    }

    $scope.hkInit=function () {
      convenientService.GetPrice(1).then(function (data) {
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
  housekeepingController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService','convenientService','FoundationApi'];
  app.register.controller('housekeepingController', housekeepingController);
});
