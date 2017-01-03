/**
 * Created by dell on 2016/10/26.
 */
define([], function () {
  var inController = function ($scope, $stateParams, $state, $controller,commonService,informationService,userService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    $scope.title= $stateParams.type=='buy'?'我要买房':'我要租房';

    $scope.menushow = false;
    $scope.toggleMenu = function () {
      $scope.menushow = !$scope.menushow;
    }

    $scope.inInfo={
      buyType:$stateParams.type=='buy'?1:2,
      village:'',
      houseArea:'',
      housePrice:'',
      name:'',
      phone:'',
      remarks:''
    }

    $scope.inInit=function () {
      commonService.Loading();
      var villages= commonService.GetCacheObj('village');
      if (villages==null){
        userService.GetVillage().then(function (data) {
          if(data.status==200){
            commonService.LoadingEnd();
            $scope.villages=data.data;
            commonService.CacheObj('village',data.data);
          }else{
            alert('获取小区失败，请稍后再试');
          }
        },function (e) {
          commonService.LoadingEnd();
          alert('获取小区失败，请稍后再试');
        });
      }else{
        commonService.LoadingEnd();
        $scope.villages=villages;
      }
    }

   $scope.inSubmit=function () {
     if(!commonService.CheckPhone($scope.inInfo.phone)){
       alert('手机号码不正确，请重新输入');
       return;
     }
      informationService.SubmitBuy($scope.inInfo).then(function (d) {
        if(d.status==200){
          alert('提交成功，我们的工作人员将尽快联系您看房');
          history.go(-1);
        }else {
          alert('提交失败，请稍后再试');
        }
      },function () {
        alert('提交失败，请稍后再试');
      })
   }


  };
  inController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService','informationService','userService'];
  app.register.controller('inController', inController);
});
