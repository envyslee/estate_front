/**
 * Created by dell on 2016/10/25.
 */

define([], function () {
  var adviceController = function ($scope, $stateParams, $state, $controller,commonService,convenientService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    $scope.adviceInfo={
      name:'',
      phone:'',
      content:''
    }

    $scope.adviceSubmit=function () {
      commonService.Loading();
      convenientService.AdviceSubmit($scope.adviceInfo).then(function (data) {
        commonService.LoadingEnd();
        if(data.status==200){
          alert('提交成功，感谢您的反馈');
        }else{
          alert('提交失败，请稍后再试');
        }
      },function () {
        commonService.LoadingEnd();
        alert('提交失败，请稍后再试');
      })
    }

  };
  adviceController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService','convenientService'];
  app.register.controller('adviceController', adviceController);
});

