/**
 * Created by dell on 2016/11/16.
 */

'use strict';
define([], function () {
  var userService = function ($resource, $q,commonService) {
    var baseUrl=app.service.baseUrl;

    var type=app.service.type;
    var version=app.service.version;

    var register=function (data) {
      var param={
        type:type,
        version:version,
        areaId:data.village.id,
        floor:data.floor,
        unit:data.unit,
        house:data.house,
        customName:data.name,
        idNo:data.idNo,
        phone:data.phone,
        niceName:data.nickName,
        password:data.pwd
      }
      var url=baseUrl+"/api/user/register";
      return commonService.BasePostRequest(url,param);
    }

    var login=function (data) {
      var param={
        type:type,
        version:version,
        phone:data.phone,
        password:data.password
      }
      var url=baseUrl+"/api/user/logIn";
      return commonService.BasePostRequest(url,param);
    }

    var logout=function () {
      var param={
        type:type,
        version:version,
        token:sessionStorage.getItem('token')
      }
      var url=baseUrl+"/api/user/logOut";
      return commonService.BasePostRequest(url,param);
    }

    var checkIdentity=function (data) {
      var param={
        type:type,
        version:version,
        idNo:data.idNo,
        phone:data.phone
      }
      var url=baseUrl+"/api/user/checkIdentity";
      return commonService.BasePostRequest(url,param);
    }

    var resetPwd=function (pwd,id) {
      var param={
        type:type,
        version:version,
        pwd:pwd,
        id:id
      }
      var url=baseUrl+"/api/user/resetPwd";
      return commonService.BasePostRequest(url,param);
    }

    var getVillage=function () {
      var param={
        type:type,
        version:version
      }
      var url=baseUrl+"/api/server/wyAreas";
      return commonService.BasePostRequest(url,param);
    }


    return{
      Register:register,
      Login:login,
      GetVillage:getVillage,
      Logout:logout,
      CheckIdentity:checkIdentity,
      ResetPwd:resetPwd
    }
  }

  userService.$inject = ['$resource', '$q','commonService'];
  app.register.factory('userService', userService);
});

