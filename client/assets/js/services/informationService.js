/**
 * Created by dell on 2016/11/16.
 */

'use strict';
define([], function () {
  var informationService = function ($resource, commonService) {
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

    var submitBuy=function (inInfo) {
        var param={
          type:type,
          version:version,
          buyType:inInfo.buyType,
          areaId:inInfo.village.id,
          houseArea:inInfo.houseArea,
          housePrice:inInfo.housePrice,
          name:inInfo.name,
          phone:inInfo.phone,
          remarks:inInfo.remarks
        }
      var url=baseUrl+"/api/server/submitBuy";
      return commonService.BasePostRequest(url,param);
    }

    var getList=function (sellType,page,rows,areaName) {
      var param={
        type:type,
        version:version,
        sellType:sellType=='sale'?1:2,
        page:page,
        rows:rows,
        areaName:areaName
      }
      var url=baseUrl+"/api/server/getList";
      return commonService.BasePostRequest(url,param);
    }

    var getDetail=function (houseId) {
      var param={
        type:type,
        version:version,
        houseId:houseId
      }
      var url=baseUrl+"/api/server/getDetail";
      return commonService.BasePostRequest(url,param);
    }

    var watchHouse=function (info) {
      var param={
        type:type,
        version:version,
        name:info.name,
        phone:info.phone,
        houseId:info.houseId
      }
      var url=baseUrl+"/api/server/watchHouse";
      return commonService.BasePostRequest(url,param);
    }

    var getInvestment=function (id) {
      var param={
        type:type,
        version:version,
        id:id
      }
      var url=baseUrl+"/api/server/getInvestment";
      return commonService.BasePostRequest(url,param);
    }


    return{
      GetTenement:getTenement,
      GetSale:getSale,
      SubmitSell:submitSell,
      GetList:getList,
      WatchHouse:watchHouse,
      GetDetail:getDetail,
      SubmitBuy:submitBuy,
      GetInvestment:getInvestment
    }

  }
  informationService.$inject = ['$resource','commonService'];
  app.register.factory('informationService', informationService);
});
