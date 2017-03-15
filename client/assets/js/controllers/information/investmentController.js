/**
 * Created by dell on 2016/10/25.
 */
define([], function () {
  var investmentController = function ($scope, $state,$stateParams,$controller,commonService,informationService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    var id=0;
    switch ($stateParams.name){
      case 'zs':
        id=3;
        $scope.title='在线招商';
        break;
      case 'gg':
        id=1;
        $scope.title='通知公告';
        break;
      default:
        break;
    }


    $scope.imInit=function () {
      commonService.Loading();
      informationService.GetInvestment(id).then(function (data) {
        commonService.LoadingEnd();
        if(data.status==200){
          $scope.list=data.data;
        }else{
          alert('获取数据失败，请稍后再试');
        }
      },function (e) {
        commonService.LoadingEnd();
        alert('获取数据失败，请稍后再试');
      })
    }

    $scope.showContent=function (content) {
      sessionStorage.setItem('content',content);
      $state.go('investmentDetail');
    }

  };
  investmentController.$inject = ['$scope', '$state','$stateParams', '$controller','commonService','informationService'];
  app.register.controller('investmentController', investmentController);
});
