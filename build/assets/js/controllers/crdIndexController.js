/**
 * Created by chengchao on 15/8/24.
 */

define([], function () {
  var crdController = function ($scope, $stateParams, $state, $controller, crdService, userService, commonService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));
    $scope.token = userService.GetToken();
    $scope.form = {};
    var dataToken = null;
    $scope.init = function () {
      if (!$scope.token) {
        $scope.initVcode();
      }
      //$state.go('crdloading')
    }
    $scope.submitForm = function () {
      //校验后
      commonService.Loading();
      if ($scope.token) {
        submitCode();
      } else {
        getCredit();
      }
    }

    $scope.initVcode = function () {
      crdService.Init().then(function (data) {
        dataToken = data.Token;
        $scope.form.url = app.service.fileuri + data.VerCodeRelativeUrl;
      }, function (e) {
        alert(e);
      });
    }
    var getCredit = function () {
      crdService.GetCredit().then(function (json) {
        login(json);
      }, function (e) {
        commonService.ErrorNotify();
      })
    }
    var login = function (json) {
      crdService.Login(json.creditAccount, json.creditPass, $scope.form.vercode, dataToken).then(function (json) {
        if (json.StatusCode == 0) {
          userService.CacheToken(dataToken);
          submitCode(json);
        } else {
          commonService.Notify(json.StatusDescription);
          commonService.LoadingEnd();
          $scope.form.url = null;
          $scope.initVcode();
        }
      }, function (e) {
        commonService.ErrorNotify();
        commonService.LoadingEnd();
      });
    }

    var submitCode = function () {
      crdService.SubmitCode($scope.form.querycode).then(function (json) {
        if (json.StatusCode == 0) {
          loading();
        } else {
          commonService.Notify(json.StatusDescription);
          commonService.LoadingEnd();
        }
      }, function (e) {
        commonService.ErrorNotify();
        commonService.LoadingEnd();
      });
    }

    var loading = function () {
      crdService.Loading().then(function (json) {
        commonService.LoadingEnd();
        $state.go('crdloading');
      }, function (e) {
        commonService.LoadingEnd();
        commonService.ErrorNotify();
      }, function (e) {
        commonService.LoadingEnd();
        commonService.ErrorNotify();
      })
    }

    $scope.relogin = function () {
      if ($scope.token) {
        $state.go('crdQuestion');
      } else {
        commonService.Loading();
        crdService.Relogin().then(function (json) {
          creditLogin(json.creditAccount, json.creditPass);
        }, function (e) {
          commonService.LoadingEnd();
          commonService.ErrorNotify();
        });
      }
    }

    var creditLogin = function (creditAccount, creditPass) {
      if (!$scope.form.vercode) {
        commonService.LoadingEnd();
        commonService.Notify("请输入验证码");
        return;
      }
      crdService.Login(creditAccount, creditPass, $scope.form.vercode, dataToken).then(function (json) {
        commonService.LoadingEnd();
        if (json.StatusCode == 0) {
          userService.CacheToken(dataToken);
          $state.go('crdQuestion');
        } else {
          if (json.StatusDescription.indexOf("登录名或密码错误") >= 0) {
            $state.go('crdLogin');
          } else {
            commonService.Notify(json.StatusDescription);
            $scope.form.url = null;
            $scope.init();
          }
        }
      }, function (e) {
        commonService.LoadingEnd();
        commonService.ErrorNotify();
      });
    }
  };

  crdController.$inject = ['$scope', '$stateParams', '$state', '$controller', 'crdService', 'userService', 'commonService'];
  app.register.controller('crdController', crdController);
});
