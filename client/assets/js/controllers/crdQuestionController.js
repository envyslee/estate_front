/**
 * Created by chengchao on 15/8/24.
 */

define([], function () {
  var crdQuestionController = function ($scope, $stateParams, $state, $controller, $q, crdService, userService, commonService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));
    $scope.results = {};
    $scope.currentStep = 0;


    var init = function () {
      var defer = $q.defer();
      crdService.GetQuestion().then(function (json) {
        if (json.StatusCode == 0) {
          $scope.results = JSON.parse(json.Result);
          defer.resolve('ok');
        } else if (json.StatusCode == 1) {
          defer.resolve(queryCreditCode());
        } else {
          defer.reject(json.StatusDescription);
        }
      }, function (e) {
        defer.reject(e);
      });
      return defer.promise;
    }
    commonService.PageLoad(init);

    var next = function () {
      if ($scope.currentStep < $scope.results.length - 1)
        $scope.currentStep = $scope.currentStep + 1;
    }

    $scope.last = function () {
      $scope.currentStep = $scope.currentStep - 1;
    }

    $scope.selectOption = function (resultIndex, qIndex) {
      $scope.results[resultIndex].answerresult = qIndex;
      next();
    }

    var queryCreditCode = function () {
      var defer = $q.defer();
      crdService.QueryCreditCode().then(function (json) {
        commonService.LoadingEnd();
        alert("人行将对您的回答进行审核并于24小时内通过短信将结果发送给您");
        //commonService.Notify("人行将对您的回答进行审核并于24小时内通过短信将结果发送给您");
        defer.resolve('ok');
        $state.go('crdIndex');
      }, function (e) {
        defer.reject(e);
      });
      return defer.promise;
    }

    var submitReport = function () {
      var defer = $q.defer();
      crdService.SubmitReport().then(function (json) {
        defer.resolve('ok');
        if(json.isClose==1)
          $state.go('close',{close_type:2});
        else
          $state.go('limit');
      }, function (e) {
        defer.reject(e);
      });
    }

    $scope.SubmitAnswer = function () {
      if ($scope.results) {
        for (var i = 0; i < $scope.results.length; i++) {
          if ($scope.results[i].answerresult && $scope.results[i].answerresult > 0) {
            $scope.results[i] = JSON.parse(commonService.UTF162UTF8(JSON.stringify($scope.results[i])));
          }
          else {
            commonService.Notify("请将问题回答完整！");
            return;
          }
        }
      }
      commonService.Loading();
      crdService.SubmitAnswer($scope.results).then(function (json) {
        if (json.StatusCode == 0) {
          queryCreditCode();
        } else {
          commonService.LoadingEnd();
          commonService.Notify(json.StatusDescription);
        }
      }, function (e) {
        commonService.LoadingEnd();
        commonService.ErrorNotify();
      })
    }
  };

  crdQuestionController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$q', 'crdService', 'userService', 'commonService'];
  app.register.controller('crdQuestionController', crdQuestionController);
})
;
