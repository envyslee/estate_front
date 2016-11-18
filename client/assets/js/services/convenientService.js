/**
 * Created by dell on 2016/11/16.
 */

'use strict';
define([], function () {
  var convenientService = function ($resource, $q,commonService) {
    var baseUrl = app.service.baseUrl;

    var type=app.service.type;
    var version=app.service.version;

    var adviceSubmit=function (info) {
      var param={
        type:type,
        version:version,
        name:info.name,
        phone:info.phone,
        content:info.content
      }
      var url=baseUrl+"/api/server/submitAdvice";
      return commonService.BasePostRequest(url,param);
    }


    var getServiceList=function () {

    }

    var getPrice=function (serviceType) {
      var param={
        type:type,
        version:version,
        serviceType:serviceType
      }
      var url=baseUrl+"/api/server/getPrice";
      return commonService.BasePostRequest(url,param);
    }

    var submitService=function (info) {
      var param={
        type:type,
        version:version,
        areaId:info.village.id,
        floor:info.floor,
        house:info.house,
        name:info.name,
        phone:info.phone,
        content:info.content,
        userId:info.userId,
        typeId:info.typeId
      }
      var url=baseUrl+"/api/server/submitService";
      return commonService.BasePostRequest(url,param);
    }

    var saveImg=function (data,contentId,imgType) {
      var a1=data.b1.split(',');
      var a2=data.b2.split(',');
      var a3=data.b3.split(',');
      var param={
        type:type,
        version:version,
        im1:a1[1],
        im2:a2[1],
        im3:a3[1],
        imgType:imgType,
        contentId:contentId
      }
      var url=baseUrl+"/api/server/savePic";
      return commonService.BasePostRequest(url,param);
    }

    return{
      AdviceSubmit:adviceSubmit,
      GetServiceList:getServiceList,
      GetPrice:getPrice,
      SubmitService:submitService,
      SaveImg:saveImg
    }

  }
    convenientService.$inject = ['$resource', '$q','commonService'];
    app.register.factory('convenientService', convenientService);
  });
