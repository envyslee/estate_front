/**
 * Created by dell on 2016/11/16.
 */

'use strict';
define([], function () {
  var informationService = function ($resource, $q,commonService) {
    var baseUrl = app.service.baseUrl;

    var type=app.service.type;
    var version=app.service.version;

    var getTenement=function (count) {
        var  param={
          type:type,
          version:version,
          count:count
        }
      var url=baseUrl+"/api/server/getTenement";
      return commonService.BasePostRequest(url,param);
    }

    var getSale=function (count) {
      var  param={
        type:type,
        version:version,
        count:count
      }
      var url=baseUrl+"/api/server/getSale";
      return commonService.BasePostRequest(url,param);
    }

    var submitSell=function (outInfo,sellType) {
      var  param={
        type:type,
        version:version,
        name:outInfo.name,
        areaId:outInfo.village.id,
        houseType:outInfo.houseType,
        fixture:outInfo.fixture,
        houseProperty:outInfo.houseProperty,
        address:outInfo.address,
        houseArea:outInfo.houseArea,
        housePrice:outInfo.housePrice,
        phone:outInfo.phone,
        remarks:outInfo.remarks,
        sellType:sellType
      }
      var url=baseUrl+"/api/server/submitSell";
      return commonService.BasePostRequest(url,param);
    }

    var getList=function (sellType,page,rows) {
      var param={
        type:type,
        version:version,
        sellType:sellType,
        page:page,
        rows:rows
      }
      var url=baseUrl+"/api/server/getList";
      return commonService.BasePostRequest(url,param);
    }


    return{
      GetTenement:getTenement,
      GetSale:getSale,
      SubmitSell:submitSell,
      GetList:getList
    }

  }
  informationService.$inject = ['$resource', '$q','commonService'];
  app.register.factory('informationService', informationService);
});
