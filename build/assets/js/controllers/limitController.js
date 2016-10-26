/**
 * Created by zhangyile on 15/8/24.
 */

define([], function () {
  var limitController = function ($scope, $stateParams, $state, $controller, $q, limitService, userService, commonService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    var openId = userService.GetUser().openId;
    var orderId = userService.GetUser().currentOrderId;
    $scope.review_amt='';
    var _init = function () {
      limitService.Init(openId, orderId);
      //var defer = $q.defer();
      //获取额度
      limitService.PreReview().then(function (data) {
        if (data.operation_result) {
          $scope.review_amt = data.decision_info.review_amt + ".00元";
          //defer.resolve('ok');
        } else {
          //defer.resolve('ok');
          $state.go('close', {close_type: 3});
        }
      }, function (e) {
        commonService.ErrorNotify();
        //defer.reject(e);
      });

      //return defer.promise;
    }
    _init();
    //commonService.PageLoad(_init);

    //更新状态跳转到门店
    $scope.Next = function (ev) {
      if (angular.element(ev.target).attr('class').indexOf('disabled') > -1) {
        commonService.Notify('额度还在计算，请稍后...');
        return;
      }
      commonService.Loading();
      limitService.Next().then(function (data) {
        commonService.LoadingEnd();
        $state.go('store');
      }, function (e) {
        commonService.LoadingEnd();
        commonService.ErrorNotify();
      });
    }
  };

  limitController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$q', 'limitService', 'userService', 'commonService'];
  app.register.controller('limitController', limitController);
});
