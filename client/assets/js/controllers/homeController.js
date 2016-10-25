/**
 * Created by chengchao on 15/8/24.
 */

define([], function () {
  var homeController = function ($scope, $stateParams, $state, $controller, homeService, userService, commonService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    var openId = $stateParams.openId;
    $scope.loadingNum = '0%';
    $scope.loadingStyle = {'width': $scope.loadingNum};
    var loadImage = function (src, fn) {
      var img = new Image();
      img.onload = function () {
        img.onload = null;
        fn && fn();
      }
      img.src = src;

    }

    var loadImages = function (percentId, srcArr, fn) {
      var total = srcArr.length;
      var i = 0;
      while (srcArr.length) {
        loadImage(srcArr.shift(), function () {
          i++;
          var percent = i / total;
          if (percent == 1) {
            fn && fn();
            return;
          } else {
            $scope.$apply(function () {
              $scope.loadingNum = (Math.ceil(percent * 100, 0)) + '%';
            });
          }
        });
      }
    }

    var img_list = [
      'arror_l.png', 'arror_l_g.png', 'arror_r.png', 'arror_r_g.png', 'bg_bank.png', 'bg_city.png', 'bg_money3.png',
      'bg_month2.png', 'btn_location.png', 'city_1.png', 'cloud_1.png', 'cloud_2.png', 'err_02.png', 'guide_lady.png',
      'hukou_no.png', 'hukou_yes.png', 'icon_edu_01.png', 'icon_edu_02.png', 'icon_edu_03.png', 'icon_getmoney.png',
      'icon_help.png', 'icon_id.png', 'icon_mark.png', 'icon_marriage_01.png', 'icon_marriage_02.png',
      'icon_marriage_03.png', 'icon_pen.png', 'icon_pig_no.png', 'icon_pig_yes.png', 'icon_success_message.png',
      'map.png', 'sky.png', 'tel-iphone.png'
    ];

    for (var j = 0; j < img_list.length; j++) {
      img_list[j] = 'assets/images/liren-img/' + img_list[j];
    }

    $scope.init = function () {
      homeService.GetCurrentState(openId).then(function (data) {
        var user_info = {'openId': openId, 'currentOrderId': data.orderId};
        userService.CacheUser(user_info);
        loadImages('loadingNum', img_list, function () {
          $scope.$apply(function () {
            $scope.loadingNum = '100%';
            $scope.loadingBoxShow = false;
            $state.go(homeService.Process(data));
          });
        });
      }, function (e) {
        if (e && e.msg && e.msg.length > 0) {
          commonService.Notify(e.msg);
        }
        else {
          commonService.ErrorNotify();
        }
      });
    }
  };

  homeController.$inject = ['$scope', '$stateParams', '$state', '$controller', 'homeService', 'userService', 'commonService'];
  app.register.controller('homeController', homeController);
})
;
