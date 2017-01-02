/**
 * Created by dell on 2016/10/26.
 */
define([], function () {
  var houseDetailController = function ($scope, $stateParams, $state, $controller,commonService,informationService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    var id=$stateParams.id;

    $scope.menushow = false;
    $scope.toggleMenu = function () {
      $scope.menushow = !$scope.menushow;
    }


    $scope.goGallery=function () {
      $state.go('gallery',{urls:$scope.detail.imgUrls});
    }

    $scope.goReserve=function () {
      $state.go('reserve',{houseId:id});
    }

    $scope.detailInit=function () {
      commonService.Loading();
        informationService.GetDetail(id).then(function (data) {
          commonService.LoadingEnd();
          if(data.status==200){
            $scope.detail=data.data;
          }else{
            alert('获取信息失败，请稍后再试')
          }
        },function () {
          commonService.LoadingEnd();
          alert('获取信息失败，请稍后再试')
        });
    }



  };
  houseDetailController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService','informationService'];
  app.register.controller('houseDetailController', houseDetailController);
});
