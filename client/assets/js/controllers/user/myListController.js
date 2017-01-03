/**
 * Created by dell on 2017/1/3.
 */
define([], function () {
  var myListController = function ($scope, $stateParams, $state, $controller,commonService,userService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));


    var type=$stateParams.type;
    $scope.title='我的'+type;

    $scope.mlInit=function () {
      commonService.Loading();
      switch (type){
        case '家政':
          $scope.kind='2';
            break;
        case '洗衣':
          $scope.kind='3';
            break;
        case '维修':
          $scope.kind='1';
            break;
        case '公共报修':
          $scope.kind='4';
          break;
        default:
              break;
      }
      if($scope.kind==''){
        commonService.LoadingEnd();
        alert('类型不正确');
        return;
      }

      userService.GetMyList(sessionStorage.getItem('id'),$scope.kind).then(function (data) {
        commonService.LoadingEnd();
        if (data.status==200){
          if(data.total==0){
            alert('您当前没有'+type+'记录');
            history.go(-1);
            return;
          }
          $scope.content=data.data;
        }else{
          alert(data.message);
        }
      },function (e) {
        commonService.LoadingEnd();
        alert('获取数据异常，请稍后再试');
      });
    }

  };
  myListController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService','userService'];
  app.register.controller('myListController', myListController);
});
