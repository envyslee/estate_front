/**
 * Created by lixiaoqiang on 15/8/24.
 */

define([], function () {
  var storeController = function ($scope, $q, $stateParams, $state, $controller, $location, storeService, userService, commonService) {

    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    var userSession = userService.GetUser();
    var openId = userSession.openId;
    var orderId = userSession.currentOrderId;
    $scope.selected = {};
    $scope.listDisplay = 0;

    var init = function(){
      var defer = $q.defer();
      storeService.getStoreInfo(orderId, openId).then(function (data) {
        $scope.user = data;
        $scope.selected = {
          "storeName": data.stores[0].store_name,
          "storeAddress": data.stores[0].store_addr,
          "agentName": data.agentName,
          "agentMobile": data.agentMobile,
          "storePhone": data.stores[0].store_phone,
          "storeMobile":data.stores[0].store_mobile,
          "openId":openId,
          "orderId":orderId,
          "storeId":data.stores[0].store_id
        };
        defer.resolve('ok');
      }, function (e) {
        defer.reject(e);
      });
      return defer.promise;
    }
    commonService.PageLoad(init);

    $scope.selectStore = function (value) {
      $scope.selected.storeAddress = value.store_addr;
      $scope.selected.storeName = value.store_name;
      $scope.selected.storeId = value.store_id;
      $scope.selected.storeMobile=value.store_mobile;
    }

    //提交VBS订单
    $scope.submitOrder = function () {
      var defer = $q.defer();
      commonService.Loading();
      //Post提交数据
      storeService.SubmitOrder($scope.selected).then(function (data) {
          commonService.LoadingEnd();
          defer.resolve('ok');
          //成功后，跳转到成功页面
          //$location.url("/loan_success");
          $state.go('loan_success');
      }, function (e) {
        commonService.LoadingEnd();
        defer.reject(e);
        commonService.Notify(e);
      })
      return defer.promise;
    }
  }

  //注入对象
  storeController.$inject = ['$scope', '$q','$stateParams', '$state', '$controller', '$location', 'storeService', 'userService', 'commonService'];
  app.register.controller('storeController', storeController);
});
