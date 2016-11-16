/**
 * Created by dell on 2016/10/25.
 */
define([], function () {
  var findPasswordController = function ($scope, $stateParams, $state, $controller,commonService,FoundationApi,userService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));


    $scope.verifyInfo={
      phone:'',
      idNo:'',
      userId:''
    }

    $scope.pwd={
      first:'',
      second:''
    }


    $scope.openReset=function () {
      commonService.Loading();
      userService.CheckIdentity($scope.verifyInfo).then(function (d) {
        commonService.LoadingEnd();
        if(d.status==200){
          $scope.verifyInfo.userId=d.data;
          FoundationApi.publish('resetModal', 'open');
        }else {
          alert(d.message);
        }
      },function () {
        commonService.LoadingEnd();
        alert('验证身份失败，请稍后再试');
      });

    }


    $scope.resetSubmit=function () {
      if($scope.pwd.first!=$scope.pwd.second){
        alert('您两次输入的密码不一致，请重新输入');
        $scope.pwd.first='';
        $scope.pwd.second='';
        return;
      }
      if($scope.pwd.first.length<6||$scope.pwd.first.length>12){
        alert('密码长度必须为6-12位，请重新输入');
        $scope.pwd.first='';
        $scope.pwd.second='';
        return;
      }
      commonService.Loading();
      userService.ResetPwd($scope.pwd.first,$scope.verifyInfo.userId).then(function (d) {
        commonService.LoadingEnd();
          if(d.status==200){
            alert('密码修改成功，立即去登录！');
            $state.go('login');
          }
      },function () {
        commonService.LoadingEnd();
        alert('重置密码失败，请稍后再试');
      })
    }

  };
  findPasswordController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService','FoundationApi','userService'];
  app.register.controller('findPasswordController', findPasswordController);
});
