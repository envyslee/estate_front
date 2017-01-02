/**
 * Created by dell on 2016/11/23.
 */
define([], function () {
  var outFixDetailController = function ($scope, $stateParams, $state, $controller,commonService,convenientService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));


    $scope.detailInfo={
      name:'',
      area:'',
      content:'',
      doContent:'',
      status:'',
      imgs:[]
    }

    $scope.outFixDetailInit=function () {
      commonService.Loading();
      convenientService.GetOutFixDetail($stateParams.id).then(function (data) {
        commonService.LoadingEnd();
        if(data.status!=200){
          alert('获取报修详情失败，请稍后再试');
        }else {
          var c=data.data;
          $scope.detailInfo.name=c.userName;
          $scope.detailInfo.area=c.area;
          $scope.detailInfo.content=c.content;
          $scope.detailInfo.doContent=c.doContent;
          $scope.detailInfo.status=c.status;
          $scope.detailInfo.imgs=c.urls;
        }
      },function (e) {
        commonService.LoadingEnd();
        alert('获取报修详情失败，请稍后再试');
      })
    }

   $scope.goGallery=function () {
      $state.go('gallery',{urls:$scope.detailInfo.imgs});
    }
  };
    outFixDetailController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService','convenientService'];
    app.register.controller('outFixDetailController', outFixDetailController);
  });
