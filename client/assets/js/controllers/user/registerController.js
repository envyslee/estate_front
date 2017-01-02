/**
 * Created by dell on 2016/10/25.
 */
define([], function () {
  var registerController = function ($scope, $stateParams, $state, $controller,commonService,userService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    $scope.userInfo={
      //village:'',
      //floor:'',
      //unit:'',
      //house:'',
      name:'',
      idNo:'',
      phone:'',
      nickName:'',
      pwd:'',
      pwdAgain:''
    };

    //sessionStorage.setItem('token',$stateParams.openId);

    $scope.type=$stateParams.type;
    if($scope.type=='register'){
      $scope.title='用户注册';
    }else if($scope.type=='modify') {
      $scope.title='信息修改';
    }

    $scope.registerInit=function () {
      var villages= commonService.GetCacheObj('village');
      if (villages==null){
        userService.GetVillage().then(function (data) {
          if(data.status==200){
            $scope.villages=data.data;
            commonService.CacheObj('village',data.data);

            if($scope.type=='modify') {
              getUserInfo();
            }
          }else{
            alert('获取小区失败，请稍后再试');
          }
        },function (e) {
          alert('获取小区失败，请稍后再试');
        });
      }else{
        $scope.villages=villages;
        if($scope.type=='modify') {
          getUserInfo();
        }
      }
    }

    var getUserInfo=function () {
      commonService.Loading();
      userService.GetUserInfo(sessionStorage.getItem('id')).then(function (data) {
        commonService.LoadingEnd();
        if(data.status==200){
          var c=data.data;
          $scope.userInfo=c;
          for(var i=0;i<$scope.villages.length;i++){
            if(i==c.areaId){
              $scope.userInfo.village=$scope.villages[i];
              break;
            }
          }
          $scope.userInfo.name=c.customName;
          $scope.userInfo.nickName=c.niceName;
        }else{
          alert(data.message);
          if(data.status==1){
            $state.go('login');
          }
        }
      },function () {
        commonService.LoadingEnd();
        alert('获取个人信息失败，请重新再试');
      })
    }

    $scope.registerSubmit=function () {
      if(!commonService.CheckPhone($scope.userInfo.phone)){
        alert('手机号格式不正确，请重新输入');
        return;
      }
      if(!commonService.CheckIdNo($scope.userInfo.idNo)){
        alert('身份证号格式不正确，请重新输入');
        return;
      }
      if($scope.type=='register'){
      if($scope.userInfo.pwd!=$scope.userInfo.pwdAgain){
        alert('您两次输入的密码不一致，请重新输入');
        $scope.userInfo.pwd='';
        $scope.userInfo.pwdAgain='';
        return;
      }else {
        if($scope.userInfo.pwd.length<6||$scope.userInfo.pwd.length>12){
          alert('密码长度必须为6-12位，请重新输入');
          $scope.userInfo.pwd='';
          $scope.userInfo.pwdAgain='';
          return;
        }
      }
      }
      commonService.Loading();
      if($scope.type=='register'){
        userService.Register($scope.userInfo).then(function (data) {
          commonService.LoadingEnd();
          if(data.status==200){
            sessionStorage.setItem('id',data.data);
            $state.go('userCenter');
          }else {
            alert(data.message);
          }
        },function () {
          commonService.LoadingEnd();
          alert('注册失败，请稍后再试');
        });
      }else if($scope.type=='modify'){
        userService.Modify($scope.userInfo).then(function (data) {
          commonService.LoadingEnd();
          if(data.status==200){
            //alert('修改信息成功，立即去登录！');
            $state.go('userCenter');
          }else {
            alert(data.message);
          }
        },function () {
          commonService.LoadingEnd();
          alert('注册失败，请稍后再试');
        });
      }

    }




  };
  registerController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService','userService'];
  app.register.controller('registerController', registerController);
});
