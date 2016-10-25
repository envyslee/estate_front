/**
 * Created by chengchao on 15/8/25.
 */

define([], function () {
  var social_gjjController = function ($scope, $stateParams, $state, $controller, $q, social_gjjService, userService, commonService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    var user_info = userService.GetUser();
    social_gjjService.Init(user_info);

    $scope.currentStep = 1;

    $scope.social_gjj = {
      "city": {},
      "cityCode": "",
      "gjj_selected": -1,
      "login_info": {}
    };

    $scope.cus_info = {};
    var _Init = function () {
      var defer = $q.defer();

      social_gjjService.GetCity().then(function (data) {
        $scope.social_gjj_cities = data.Social_City;
        social_gjjService.GetCus().then(function (data) {
          $scope.cus_info = data;
          defer.resolve('ok');
        }, function (e) {
          defer.reject(e);
        });
      }, function (e) {
        defer.reject(e);
      });
      return defer.promise;
    }

    commonService.PageLoad(_Init);

    $scope.select_option = function (op) {
      if (op == 1) {
        $scope.social_gjj.gjj_selected = '0';
      }
      else if (op == 2) {
        $scope.social_gjj.gjj_selected = '1';
      }
      $scope.NextStep();
    };

    $scope.PrevStep = function () {
      $scope.currentStep = $scope.currentStep - 1 < 1 ? 1 : $scope.currentStep - 1;
      if ($scope.currentStep == 2) {
        $scope.social_gjj.login_info = {};
        $scope.FormSetting = {};
      }
    }

    $scope.FormSettings = [];
    $scope.CurrentFormSetting = {};
    $scope.FormParam = {};

    $scope.NextStep = function (ev) {
      if (ev && angular.element(ev.target).attr('class').indexOf('disabled') > -1) {
        return;
      }

      $scope.currentStep = $scope.currentStep + 1 > 3 ? 3 : $scope.currentStep + 1;
      if ($scope.currentStep == 3) {
        commonService.Loading();
        $scope.GetLoginParam().then(function (data1) {
          commonService.LoadingEnd();
          $scope.LoginInit().then(function (data2) {
          }, function (e) {
            commonService.ErrorNotify();
          });
        }, function (e) {
          commonService.LoadingEnd();
          commonService.ErrorNotify();
        })
      }
    }

    $scope.NotFindCity = function () {
      commonService.Loading();
      social_gjjService.NotFindCity().then(function (data) {
        commonService.LoadingEnd();
        $state.go('close', {close_type: 4});
      }, function (e) {
        commonService.LoadingEnd();
        commonService.ErrorNotify();
      });
    }

    $scope.LoginInit = function () {
      var defer = $q.defer();
      var type = $scope.social_gjj.gjj_selected == "1" ? 1 : 2;
      social_gjjService.LoginInit(type, $scope.social_gjj.city.CityCode).then(function (data) {
        if (data.StatusCode == 0) {
          $scope.social_gjj.login_info.token = data.Token;
          $scope.social_gjj.login_info.vercodeurl = app.service.fileuri + data.VerCodeRelativeUrl;
          defer.resolve('ok');
        } else {
          defer.reject(data.StatusDescription);
        }
      }, function (e) {
        defer.reject('');
      });

      return defer.promise;
    }

    $scope.GetLoginParam = function () {
      var defer = $q.defer();
      var type = $scope.social_gjj.gjj_selected == "1" ? 1 : 2;
      if ($scope.social_gjj.city.GjjSettings && type == 1) {
        $scope.FormSettings = $scope.social_gjj.city.GjjSettings;
        $scope.CurrentFormSetting = {'index': 0, 'setting': $scope.FormSettings[0]};
        $scope.social_gjj.login_info.login_type = $scope.CurrentFormSetting.setting.LoginType;
        $scope.FormParam = {};
        defer.resolve('ok');
      }
      else if ($scope.social_gjj.city.SocialSettings && type == 2) {
        $scope.FormSettings = $scope.social_gjj.city.SocialSettings;
        $scope.CurrentFormSetting = {'index': 0, 'setting': $scope.FormSettings[0]};
        $scope.social_gjj.login_info.login_type = $scope.CurrentFormSetting.setting.LoginType;
        $scope.FormParam = {};
        defer.resolve('ok');
      } else {
        social_gjjService.GetLoginParam(type, $scope.social_gjj.city.CityCode).then(function (data) {
            if (data.StatusCode == 0) {
              var FormSettings = JSON.parse(data.Result).FormSettings;
              if (FormSettings.length > 1) {
                if (type == 1 && $scope.social_gjj.city.GjjLoginType) {
                  angular.forEach(($scope.social_gjj.city.GjjLoginType), function (setting, index) {
                    angular.forEach(JSON.parse(data.Result).FormSettings, function (set) {
                      if (set.LoginType == setting) {
                        $scope.FormSettings.push(set);
                      }
                    });
                  });
                }
                else if (type == 2 && $scope.social_gjj.city.SocialLoginType) {
                  angular.forEach(($scope.social_gjj.city.SocialLoginType), function (setting, index) {
                    angular.forEach(JSON.parse(data.Result).FormSettings, function (set) {
                      if (set.LoginType == setting) {
                        $scope.FormSettings.push(set);
                      }
                    });
                  });
                }
                else {
                  angular.forEach(JSON.parse(data.Result).FormSettings, function (set) {
                    $scope.FormSettings.push(set);
                  });
                }
              } else {
                $scope.FormSettings = FormSettings;
              }
              angular.forEach($scope.FormSettings, function (set) {
                angular.forEach(set.FormParams, function (param) {
                  if (param.ParameterCode == 'identitycard') {
                    param.ParameterValue = $scope.cus_info.idNo;
                    return;
                  }
                });
              });
              if (type == 1) {
                $scope.social_gjj.city.GjjSettings = $scope.FormSettings;
              }
              else {
                $scope.social_gjj.city.SocialSettings = $scope.FormSettings;
              }

              $scope.CurrentFormSetting = {'index': 0, 'setting': $scope.FormSettings[0]};
              $scope.social_gjj.login_info.login_type = $scope.CurrentFormSetting.setting.LoginType;
              $scope.FormParam = {};
              defer.resolve('ok');
            } else {
              defer.reject(data.StatusDescription);
            }
          },
          function (e) {
            defer.reject('');
          });
      }
      return defer.promise;
    }

    $scope.ChangeAuth = function () {
      if ($scope.FormSettings.length == 1) {
        return;
      }
      var index = $scope.CurrentFormSetting.index > 0 ? 0 : 1;
      $scope.CurrentFormSetting = {'index': index, 'setting': $scope.FormSettings[index]};
    }

    $scope.Login = function () {
      commonService.Loading();
      var json = '{';
      angular.forEach($scope.CurrentFormSetting.setting.FormParams, function (param, i) {
        json += '"' + param.ParameterCode + '":' + '"' + param.ParameterValue + '"';
        if (i < $scope.CurrentFormSetting.setting.FormParams.length - 1) {
          json += ',';
        }
      });

      json += '}';
      $scope.FormParam = JSON.parse(json);
      $scope.FormParam.token = $scope.social_gjj.login_info.token;
      $scope.FormParam.identitycard = $scope.cus_info.idNo;
      $scope.FormParam.logintype = $scope.CurrentFormSetting.setting.LoginType;

      var type = $scope.social_gjj.gjj_selected == "1" ? 1 : 2;
      social_gjjService.Login(type, $scope.social_gjj.city.CityCode, $scope.FormParam).then(function (data) {
        if (data.StatusCode == 0) {
          commonService.LoadingEnd();
          social_gjjService.InsertSocial($scope.FormParam.name ? $scope.FormParam.name : '').then(function (result) {
            $state.go('limit');
          }, function (e) {
            commonService.LoadingEnd();
            commonService.ErrorNotify();
            $scope.LoginInit();
          });
        }
        else {
          commonService.LoadingEnd();
          commonService.Notify(data.StatusDescription);
          $scope.LoginInit();
        }
      }, function (e) {
        commonService.LoadingEnd();
        commonService.ErrorNotify();
        $scope.LoginInit();
      });
    }
  };

  social_gjjController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$q', 'social_gjjService', 'userService', 'commonService'];
  app.register.controller('social_gjjController', social_gjjController);
});
