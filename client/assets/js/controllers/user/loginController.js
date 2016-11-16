/**
 * Created by dell on 2016/10/25.
 */
define([], function () {
  var loginController = function ($scope, $stateParams, $state, $controller,commonService,userService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    $scope.login={
      phone:'',
      password:''
    }

    $scope.loginSubmit=function () {
      userService.Login($scope.login).then(function (data) {
        if(data.status==200){
          var user=data.data;
          sessionStorage.setItem('token',user.token);
          sessionStorage.setItem('nickName',user.nickName);
          $state.go('userCenter');
        }else{
          alert(data.message);
        }
      },function (e) {
        alert('登录失败，请稍后再试');
      });
    }


  };
  loginController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService','userService'];
  app.register.controller('loginController', loginController);
});
