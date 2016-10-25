/**
 * Created by chengchao on 15/8/24.
 */

define([], function () {
  var crdLoginController = function ($scope, $stateParams, $state, $controller, crdService, userService, commonService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));
    $scope.form = {url: null, username: '', password: '', vercode: ''};
    $scope.init = function () {
      $scope.form.url = null;
      crdService.Init().then(function (data) {
          userService.CacheToken(data.Token);
        $scope.form.url = app.service.fileuri + data.VerCodeRelativeUrl;
      }, function (e) {
        commonService.ErrorNotify();
      });

    }

    $scope.submitForm = function (ev) {
      if (angular.element(ev.target).attr('class').indexOf('disabled') > -1) {
        return;
      }
      commonService.Loading();
      login();
    }

    var login = function () {
      crdService.Login($scope.form.username, $scope.form.password, $scope.form.vercode).then(function (json) {
        if (json.StatusCode == 0) {
          codeCondition();
        } else {
          commonService.LoadingEnd();
          commonService.Notify(json.StatusDescription);
          $scope.form.url = null;
          $scope.init();
        }
      }, displayException);
    }

    var codeCondition = function () {
      crdService.CodeCondition().then(function (json) {
        if (json.StatusCode == 0) {
          if (json.Result == '已生成' || json.Result == '处理中') {
            queryCreditCode();
          } else {
            loginCredit();
          }
        } else {
          commonService.Notify(json.StatusDescription);
        }
      }, displayException);

    }

    var queryCreditCode = function () {
      crdService.QueryCreditCode().then(function (json) {
        commonService.LoadingEnd();
        $state.go('crdIndex');
      }, displayException);
    }

    var loginCredit = function () {
      crdService.LoginCredit($scope.form).then(function (json) {
        commonService.LoadingEnd();
        $state.go('crdIndex');
      }, displayException);
    }

    var displayException = function (e) {
      commonService.LoadingEnd();
      commonService.ErrorNotify();
    }
  };

  crdLoginController.$inject = ['$scope', '$stateParams', '$state', '$controller', 'crdService', 'userService', 'commonService'];
  app.register.controller('crdLoginController', crdLoginController);
});
