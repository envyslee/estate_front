/**
 * Created by dell on 2016/10/26.
 */
define([], function () {
  var outController = function ($scope, $stateParams, $state, $controller,commonService,userService,informationService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    var type=$stateParams.type;
    $scope.title= type=='sale'?'我要卖房':'我要出租';

    $scope.menushow = false;
    $scope.toggleMenu = function () {
      $scope.menushow = !$scope.menushow;
    }

    $scope.outInfo={
      village:'',
      houseType:'',
      fixture:'',
      houseProperty:'',
      address:'',
      houseArea:'',
      housePrice:'',
      phone:'',
      remarks:''
    }

    $scope.imgSrc={
      i1:'',
      i2:'',
      i3:''
    }

    var imgIndex=1;

    $scope.labelClick=function () {
      if(imgIndex>3){
        alert('只可以上传3张图片');
        return;
      }
      var appVersion=window.navigator.appVersion;
      if((/iphone|ipad/gi).test(appVersion)){
        var input=document.getElementById('p1');
        input.click();
      }
    }

    $scope.showMax=function (index) {
      document.body.style.overflow='hidden';

        if(index==1){
          $scope.chooseImg=$scope.imgSrc.i1;
        }else if(index==2){
          $scope.chooseImg=$scope.imgSrc.i2;
        }else if(index==3){
          $scope.chooseImg=$scope.imgSrc.i3;
        }
    }

    $scope.closeMax=function () {
      document.body.style.overflow='auto';
      $scope.chooseImg='';
    }

    $scope.delImg=function (index) {
      if(index==1){
        $scope.imgSrc.i1='';
      }else if(index==2){
        $scope.imgSrc.i2='';
      }else if(index==3){
        $scope.imgSrc.i3='';
      }
      imgIndex--;
    }

    $scope.uploadImg = function () {
      var file = event.target.files[0];
      if($scope.imgSrc.i1==''){
        $scope.imgSrc.i1=window.URL.createObjectURL(file);
      }else  if($scope.imgSrc.i2==''){
        $scope.imgSrc.i2=window.URL.createObjectURL(file);
      }else {
        $scope.imgSrc.i3=window.URL.createObjectURL(file);
      }
      $scope.$apply();
      imgIndex++;
      // var reader = new FileReader();
      // reader.readAsDataURL(file);
      // reader.onload=function () {
      //   var canvas;
      //   if(imgIndex==1){
      //      canvas=document.getElementById('uploadImg1');
      //   }else if(imgIndex==2){
      //      canvas=document.getElementById('uploadImg2');
      //   }else  if(imgIndex==3){
      //      canvas=document.getElementById('uploadImg3');
      //   }else {
      //     alert('只可以上传3张图片');
      //   }
      //   var ctx=canvas.getContext('2d');
      //   canvas.width=64;
      //   canvas.height=64;
      //   var img=new Image();
      //   img.src=this.result;
      //   ctx.drawImage(img,0,0,64,64);
      //   imgIndex++;
      // }
    }

    $scope.outInit=function () {
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

    $scope.outSubmit=function () {
      if(!commonService.CheckPhone($scope.outInfo.phone)){
        alert('手机号不正确，请重新输入');
        return;
      }

      informationService.SubmitSell($scope.outInfo,type=='sale'?2:1).then(function (d) {
        if(d.status==200){
          alert('提交成功，我们的工作人员将尽快给您推荐优质客源');
          $state.go('house');
        }else {
          alert('提交失败，请稍后再试');
        }
      },function (e) {
        alert('提交失败，请稍后再试');
      });
    }


  };
  outController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService','userService','informationService'];
  app.register.controller('outController', outController);
});
