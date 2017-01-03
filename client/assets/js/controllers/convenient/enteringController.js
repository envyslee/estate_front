/**
 * Created by dell on 2016/10/27.
 */

define([], function () {
  var enteringController = function ($scope, $stateParams, $state, $controller,commonService,userService,convenientService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));



    $scope.enterInfo={
      // village:'',
      // floor:'',
      // house:'',
      name:'',
      phone:'',
      content:'',
      typeId:$stateParams.typeId
    }

    $scope.from=$stateParams.from;
    if( $scope.from=='inFix'){
      $scope.title="室内报修";
      $scope.enterInfo.typeId=1;
    }else if( $scope.from=='wash'){
      $scope.title="洗衣服务";
      $scope.enterInfo.typeId=3;
    }else if( $scope.from=='housekeeping'){
      $scope.title="家政服务";
      $scope.enterInfo.typeId=2;
    }



    $scope.imgSrc={
      i1:'',
      i2:'',
      i3:'',
      b1:'',
      b2:'',
      b3:''
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
        $scope.imgSrc.b1='';
      }else if(index==2){
        $scope.imgSrc.i2='';
        $scope.imgSrc.i2='';
      }else if(index==3){
        $scope.imgSrc.i3='';
        $scope.imgSrc.b3='';
      }
      imgIndex--;
    }

    $scope.uploadImg = function () {
      var file = event.target.files[0];
      if($scope.imgSrc.i1==''){
        $scope.imgSrc.i1=window.URL.createObjectURL(file);
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(){
          $scope.imgSrc.b1=zipPic(this.result);
        }
      }else  if($scope.imgSrc.i2==''){
        $scope.imgSrc.i2=window.URL.createObjectURL(file);
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(){
          $scope.imgSrc.b2=zipPic(this.result);
        }
      }else {
        $scope.imgSrc.i3=window.URL.createObjectURL(file);
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(){
          $scope.imgSrc.b3=zipPic(this.result);
        }
      }
      $scope.$apply();
      imgIndex++;
    }

    var zipPic=function (result) {
      var canvas=document.getElementById("uploadImg");
      var cxt=canvas.getContext('2d');
      var img=new Image();
      img.src= result;
      canvas.width=640;
      canvas.height=640*(img.height/img.width);
      cxt.drawImage(img,0,0,640,canvas.height);
      return canvas.toDataURL("image/jpeg",0.9);
    }

    // $scope.enterInit=function () {
    //   commonService.Loading();
      // var villages= commonService.GetCacheObj('village');
      // if (villages==null){
      //   userService.GetVillage().then(function (data) {
      //     commonService.LoadingEnd();
      //     if(data.status==200){
      //       $scope.villages=data.data;
      //       commonService.CacheObj('village',data.data);
      //     }else{
      //       alert('获取小区失败，请稍后再试');
      //     }
      //   },function (e) {
      //     commonService.LoadingEnd();
      //     alert('获取小区失败，请稍后再试');
      //   });
      // }else{
      //   commonService.LoadingEnd();
      //   $scope.villages=villages;
      // }
   // }

    $scope.enterSubmit=function () {
      if(!commonService.CheckPhone($scope.enterInfo.phone)){
        alert('手机号不正确，请重新输入');
        $scope.enterInfo.phone='';
        return;
      }
      commonService.Loading();
      convenientService.SubmitService($scope.enterInfo).then(function (d) {
        if(d.status==200){
          var id=d.data;
          if($scope.imgSrc.i1!=''||$scope.imgSrc.i2!=''||$scope.imgSrc.i3!=''){
            convenientService.SaveImg($scope.imgSrc,id,2).then(function (data) {
              commonService.LoadingEnd();
              if(data.status==200){
                alert('提交成功，我们的工作人员将及时跟进');
                history.go(-1);
              }else {
                alert('图片上传失败');
              }
            },function () {
              commonService.LoadingEnd();
              alert('图片上传失败');
            })
          }else{
            alert('提交成功，我们的工作人员将及时跟进');
            //window.close();
            //window.open("","_self").close();
            commonService.LoadingEnd();
            history.go(-1);
          }
        }else {
          commonService.LoadingEnd();
          alert(d.message);
        }
      },function () {
        commonService.LoadingEnd();
        alert('提交失败，请稍后再试');
      })



    }

  };
  enteringController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService','userService','convenientService'];
  app.register.controller('enteringController', enteringController);
});
