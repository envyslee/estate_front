/**
 * Created by dell on 2016/11/16.
 */

'use strict';
define([], function () {
  var convenientService = function ($resource, $q,commonService) {
    var baseUrl = app.service.baseUrl;

  }
  convenientService.$inject = ['$resource', '$q','commonService'];
    app.register.factory('userService', convenientService);
  });
