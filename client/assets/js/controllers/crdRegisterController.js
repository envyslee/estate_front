/**
 * Created by lixiaoqiang on 15/8/24.
 */

define([], function () {
  var crdRegisterController = function ($scope, $q, $location, $stateParams, $state, $controller, $timeout, $interval, crdService, userService, commonService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    $scope.form = {
      url: null, name: '', idType: '', idNo: '', vercode: '',
      url: null, username: '', password: '', compassword: '',
      mobile: '', email: '', vericode: ''
    };

    $scope.step = 1;

    //请求URL获取验证码
    $scope.init = function () {
      $scope.form.url = null;
      crdService.Init().then(function (data) {
          userService.CacheToken(data.Token);
          $scope.form.url = app.service.fileuri + data.VerCodeRelativeUrl;
        }, function (e) {
          commonService.ErrorNotify();
        }
      );
    }


    $scope.pre = function () {
      $state.go('crdLogin');
    }

    //提交问题
    $scope.next = function () {
      commonService.Loading();
      //1.首先校验身份证
      commonService.IdCardCheck($scope.form.idNo).then(function (data) {
        var tokenParam = userService.GetToken();
        //2.提交到公积金中心
        crdService.RegFirstSubmit(tokenParam, $scope.form.name,
          $scope.form.idNo.toUpperCase(), $scope.form.idType, $scope.form.vercode
        ).then(function (data) {
            commonService.LoadingEnd();
            if (data.StatusCode == 0) {
              $scope.step = 2;
            }
            else{
              commonService.Notify(data.StatusDescription);
              $scope.init();
            }
          }, function (e) {
            commonService.LoadingEnd();
            commonService.ErrorNotify();
            $scope.init();
          });
      }, function (e) {
        commonService.LoadingEnd();
        commonService.ErrorNotify();
      });
    }

    $scope.vercodeTitle = "点击获取";
    var totalCount = 59;
    var count = totalCount;

    //获取验证码
    $scope.SendVerifyCode = function () {
      //commonService.Loading();
      if ($scope.vercodeTitle != '点击获取' && $scope.vercodeTitle != '重新获取') {
        commonService.LoadingEnd();
        return;
      }
      //检查手机号码
      commonService.MobileCheck($scope.form.mobile).then(function (data) {
        SendCode();
      }, function (e) {
        //commonService.LoadingEnd();
        commonService.Notify(e.msg);
      });
    }

    var SendCode = function () {
      //var defer = $q.defer();
      //成功调用接口，发送短信
      crdService.RegisterVerifyMobile(userService.GetToken(), $scope.form.mobile).then(function (data) {
        if (data.StatusCode == 0) {

          //defer.resolve('发送成功');
          commonService.Notify('发送成功');
          $scope.vercodeTitle = count + 's';
          commonService.LoadingEnd();

          var interval = $interval(function () {
            $scope.vercodeTitle = count-- + 's';
          }, 1000);

          var timer = $timeout(function () {
            $interval.cancel(interval);
            count = totalCount;
            $scope.vercodeTitle = '重新获取';
          }, (totalCount + 1) * 1000);

          timer.then(function () {
            if (timer) {
              $timeout.cancel(timer);
            }
          }, function () {

          });
        } else {
          commonService.Notify(data.StatusDescription)
        }
      }, function (e) {
        $scope.vercodeTitle = '重新获取';
        commonService.Notify(e);
      });
    }

    //注册
    $scope.submitRegister = function () {
      if ($scope.form.password != $scope.form.compassword) {
        commonService.Notify("两次输入的密码不一致");
        return;
      }
      commonService.Loading();
      var tokenParam = userService.GetToken();
      //2.注册成功是否
      crdService.RegSecondSubmit(tokenParam, $scope.form.username, $scope.form.password, $scope.form.email, $scope.form.mobile, $scope.form.vericode
      ).then(function (data) {
          commonService.LoadingEnd();
          if (data.StatusCode == 0) {
            $state.go('crdregSuccess');
          } else {
            commonService.Notify(data.StatusDescription);
          }
        }, function (e) {
          commonService.LoadingEnd();
          commonService.ErrorNotify();
        });
    }
  };


  crdRegisterController.$inject = ['$scope', '$q', '$location', '$stateParams', '$state', '$controller', '$timeout', '$interval', 'crdService', 'userService', 'commonService'];
  app.register.controller('crdRegisterController', crdRegisterController);
});
