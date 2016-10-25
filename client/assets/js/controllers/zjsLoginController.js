define([], function () {
  var zjsLoginController = function ($scope, $stateParams, $state, $controller, $location, zjsService, userService, commonService) {

    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    $scope.loginBtn = function () {
      if ($scope.pwd == null || $scope.pwd == '' || $scope.userName == null || $scope.userName == '') {
        commonService.Notify("请填写用户名和密码！");
      } else {
        commonService.Loading();
        zjsService.queryAgent($scope.userName, $scope.pwd, $stateParams.data).then(function (data) {
          commonService.LoadingEnd();
          if (data.code == 1) {
            commonService.Notify(data.message);
          } else if(data.code == 0) {
            //表示登录成功
            if(data.bindVmoney) {//绑定了维金荟账户
              $state.go('zjs_list', {qcrPath: encodeURI(data.qcrPath)});
            }else{//未绑定维金荟账户，跳转页面
              $state.go('zjs_error',{openId:$stateParams.data});
            }
          }
        }, function (e) {
          commonService.LoadingEnd();
          commonService.Notify("系统繁忙，稍后再试！");
        });
      }
    }
  }
  //注入对象
  zjsLoginController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'zjsService', 'userService', 'commonService'];
  app.register.controller('zjsLoginController', zjsLoginController);
});
