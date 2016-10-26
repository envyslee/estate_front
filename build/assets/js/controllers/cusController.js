/**
 * Created by chengchao on 15/8/26.
 */
define([], function () {
    var cusController = function ($scope, $stateParams, $state, $controller, $q, $timeout, $interval, cusService, userService, commonService) {
      angular.extend(this, $controller('DefaultController', {
        $scope: $scope,
        $stateParams: $stateParams,
        $state: $state
      }));

      var user_info = userService.GetUser();

      //alert(user_info.currentOrderId);
      $scope.formData = {
        orderId: user_info.currentOrderId,
        custProvince: '',
        custCity: '',
        household: -1,
        custMarriage: 0,
        custEducation: 0,
        ifSocial: -1,
        idNo: '',
        custMobile: '',
        telCode: '',
        veriCode: '',
        socialTime: 12,
        socialMoney: 5000
      };
      var pages = [
        {'index': 0, 'page': 'city'},
        {'index': 1, 'page': 'hukou'},
        {'index': 2, 'page': 'marrige'},
        {'index': 3, 'page': 'education'},
        {'index': 4, 'page': 'social'},
        {'index': 5, 'page': 'social_detail'},
        {'index': 6, 'page': 'idcard'},
        {'index': 7, 'page': 'mobile'}
      ]
      $scope.province_selected = {'name': '省份'};
      $scope.city_selected = {'name': '城市'};

      var socialMonthWatch = $scope.$watch('formData.socialTime', function (newVal) {
        if (newVal == 6) {
          $scope.monthspan = "及以下";
        } else if (newVal == 36) {
          $scope.monthspan = "及以上";
        } else {
          $scope.monthspan = "";
        }
      });
      var incomeWatch = $scope.$watch('formData.socialMoney', function (newVal) {
        if (newVal == 2000) {
          $scope.incomespan = "及以下";
        } else if (newVal == 20000) {
          $scope.incomespan = "及以上";
        } else {
          $scope.incomespan = "";
        }
      });

      $scope.init = function () {
        cusService.Init(user_info.openId);
        $scope.currentPage = pages[0];
        //获取省市
        cusService.GetAllProvince().then(function (data) {
          $scope.provinces = data;
        }, function (e) {
          commonService.ErrorNotify();
        });

      }
      $scope.init();

      //获取城市
      $scope.changeCity = function (cityName) {
        var flag = false;
        if (cityName.length == 0) {
          $scope.city_selected = $scope.province_selected.cities[0];
          flag = true;
        }
        else {
          angular.forEach($scope.province_selected.cities, function (city) {
            if (city.name.indexOf(cityName) > -1 || cityName.indexOf(city.name) > -1) {
              $scope.city_selected = city;
              flag = true;
              return;
            }
          });
        }

        if (!flag) {
          $scope.province_selected = {'name': '省份'};
          $scope.city_selected = {'name': '城市'};
          commonService.Notify("定位失败,请手动选择");
        }
      }

      //下一步
      $scope.NextStep = function (ev) {
        if (angular.element(ev.target).attr('class').indexOf('disabled') > -1) {
          return;
        }
        $scope.next();
      }

      //下一步
      $scope.next = function () {
        _PageCheck().then(function (data) {
          if ($scope.currentPage.page == 'social_detail') {
            socialMonthWatch();
            incomeWatch();

          }
          var index = ($scope.currentPage.index > pages.length) ? pages.length : $scope.currentPage.index + 1;
          if (pages[index].page == 'social_detail') {
            if ($scope.formData.ifSocial == 0) {
              $scope.formData.socialTime = 0;
              index++;
            }
            else {
              $scope.formData.socialTime = $scope.formData.socialTime == 0 ? 12 : $scope.formData.socialTime;
            }
          }
          $scope.currentPage = pages[index];
        }, function (e) {
          commonService.Notify(e);
        });
      }

      //上一步
      $scope.PrevStep = function () {
        var index = ($scope.currentPage.index < 0) ? 0 : $scope.currentPage.index - 1;
        if (pages[index].page == 'social_detail' && $scope.formData.ifSocial == 0) {
          $scope.formData.socialTime = 0;
          index--;
        }
        else {
          $scope.formData.socialTime = $scope.formData.socialTime == 0 ? 12 : $scope.formData.socialTime;
        }
        $scope.currentPage = pages[index];
      }

      //定位
      $scope.location = function () {
        if (navigator.geolocation) {
          $scope.province_selected = {'name': '定位中'};
          $scope.city_selected = {'name': '定位中'};
          navigator.geolocation.getCurrentPosition(_ShowPosition, _ShowPositionError);
        }
        else {
          commonService.Notify("浏览器不支持地理定位。");
        }
      }

      var _ShowPosition = function (position) {
        commonService.ShowPosition(position).then(function (data) {
          var flag = false;
          //根据定位的省，重新加载城市
          angular.forEach($scope.provinces, function (pro) {
            if (data.province.indexOf(pro.name) > -1) {
              $scope.province_selected = {name: data.province};
              $scope.province_selected = pro;
              $scope.changeCity(data.city);
              flag = true;
              return;
            }
          });
          if (!flag) {
            $scope.province_selected = {'name': '省份'};
            $scope.city_selected = {'name': '城市'};
            commonService.Notify("定位失败,请手动选择");
          }
        }, function (error) {
          $scope.province_selected = {'name': '省份'};
          $scope.city_selected = {'name': '城市'};
          commonService.Notify(error);
        });
      }

      var _ShowPositionError = function (error) {
        if (!$scope.city_selected.id) {
          $scope.province_selected = {'name': '省份'};
          $scope.city_selected = {'name': '城市'};
          commonService.Notify("定位失败,请手动选择");
        }
      }

      //数据绑定
      $scope.select_option = function (type) {
        if ($scope.currentPage.page == 'hukou') {
          $scope.formData.household = type;
        } else if ($scope.currentPage.page == 'marrige') {
          $scope.formData.custMarriage = type;
        } else if ($scope.currentPage.page == 'education') {
          $scope.formData.custEducation = type;
        } else if ($scope.currentPage.page == 'social') {
          $scope.formData.ifSocial = type;
        }
        $scope.next();
      };

      //点击下一步，数据处理及校验
      var _PageCheck = function () {
        var defer = $q.defer();
        var promise = defer.promise;
        if ($scope.currentPage.page == 'city') {
          defer.resolve(_CityCheck());
        } else if ($scope.currentPage.page == 'social') {
          defer.resolve(_SocialCheck());
        } else if ($scope.currentPage.page == 'idcard') {
          defer.resolve(_IdCardCheck());
        } else if ($scope.currentPage.page == 'mobile') {
          defer.resolve(_SubmitCus());
        }
        else {
          defer.resolve('ok');
        }
        return promise;
      };

      var _CityCheck = function () {
        commonService.Loading();
        var defer = $q.defer();
        $scope.formData.custProvince = $scope.province_selected.id;
        $scope.formData.custCity = $scope.city_selected.id;
        cusService.CheckStore($scope.formData, $scope.city_selected.name).then(function (data) {
          if (!data.hasstore) {
            commonService.LoadingEnd();
            $state.go('close', {close_type: 1});
          }
          else {
            commonService.LoadingEnd();
            defer.resolve('ok');
          }
        }, function (e) {
          commonService.LoadingEnd();
          defer.reject(e);
        });
        return defer.promise;
      }

      var _SocialCheck = function () {
        var defer = $q.defer();
        //缴纳社保 或者 本地籍且未缴纳社保
        if ($scope.formData.ifSocial == 1 || ($scope.formData.ifSocial == 0 && $scope.formData.household == 1)) {
          defer.resolve('ok');
        }
        // 未繳納社保 或者非本地籍
        else {
          commonService.Loading();
          //关闭订单
          cusService.CloseOrder($scope.formData, 5).then(function (data) {
            commonService.LoadingEnd();
            $state.go('close', {close_type: 4});
          }, function (e) {
            defer.reject(e);
            commonService.LoadingEnd();
          });
        }
        return defer.promise;
      }

      var _IdCardCheck = function () {
        commonService.Loading();
        var defer = $q.defer();
        commonService.IdCardCheck($scope.formData.idNo).then(function (result) {
          cusService.CheckIdCard($scope.formData).then(function (data) {
            if (!data.operation_result) {
              commonService.LoadingEnd();
              if (data.operation_msg == '不符合加贷条件')
                $state.go('close', {close_type: 3});
              else
                $state.go('close', {close_type: 5});
            }
            else {
              commonService.LoadingEnd();
              defer.resolve('ok');
            }
          }, function (e) {
            commonService.LoadingEnd();
            defer.reject(e);
          });
        }, function (error) {
          commonService.LoadingEnd();
          commonService.Notify(error.msg);
        });
        return defer.promise;
      }

      $scope.CodeMsg = '获取';
      var totalCount = 59;
      var count = totalCount;

      $scope.SendVerifyCode = function () {
        commonService.Loading();
        if ($scope.CodeMsg != '获取') {
          commonService.LoadingEnd();
          return;
        }
        commonService.MobileCheck($scope.formData.custMobile).then(function (data) {
          _SendCode();
        }, function (e) {
          commonService.LoadingEnd();
          commonService.Notify(e.msg);
        });
      }

      var _SendCode = function () {
        var defer = $q.defer();
        cusService.SendVerifyCode($scope.formData.custMobile).then(function (data) {
            $scope.formData.veriCode = data;
            defer.resolve('发送成功');
            commonService.Notify('发送成功');
            $scope.CodeMsg = $scope.CodeMsg = count;
            ;
            commonService.LoadingEnd();
            var interval = $interval(function () {
              $scope.CodeMsg = count--;
            }, 1000);

            var timer = $timeout(function () {
              $interval.cancel(interval);
              count = totalCount;
              $scope.CodeMsg = '获取';
            }, (totalCount + 1) * 1000);
            timer.then(function () {
              if (timer) {
                $timeout.cancel(timer);
              }
            }, function () {
            });
          }, function (e) {
            $scope.CodeMsg = '获取';
            commonService.LoadingEnd();
            defer.reject('发送失败');
          }
        )
        ;
        return defer.promise;
      }

      var _SubmitCus = function () {
        commonService.Loading();
        var defer = $q.defer();

        if ($scope.formData.veriCode == '') {
          defer.reject("请先获取验证码！");
        }
        //校驗socialTime
        if ($scope.formData.ifSocial < 1) {
          $scope.formData.socialTime = 0;
        }
        //校验手机号是否合法
        commonService.MobileCheck($scope.formData.custMobile).then(function (data) {
          cusService.CheckTelCode($scope.formData.telCode, $scope.formData).then(function (data) {
            if (data == 1) {
              commonService.LoadingEnd();
              $state.go('crdRoute');
            } else if (data == 4) {
              commonService.LoadingEnd();
              $state.go('close', {close_type: 2});
            }
          }, function (e) {
            commonService.LoadingEnd();
            defer.reject(e);
          });
        }, function (e) {
          commonService.LoadingEnd();
          commonService.Notify(e.msg);
          return;
        });

        return defer.promise;
      }
    }

    cusController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$q', '$timeout', '$interval', 'cusService', 'userService', 'commonService'];
    app.register.controller('cusController', cusController);
  }
)
;
