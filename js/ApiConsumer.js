window.Api = (function ($) {
  "use strict";
  var Api = {
    basePath: function () {
      return "http://localhost/counter/counterapi";
      //return "http://labs.emendare.cl/municipales";
    },
    
    tableId: -1,

    getStats: function(success, error) {
      
      if  (typeof(success) !== "function" || typeof(error) !== "function") {
        throw "The suministred parameters must be functions";
      }

      $.ajax({
        url: this.basePath() + "/api/stats",
        type: "GET",
        dataType: "json",
        success: success,
        error: error
      });
    },

    login: function(data, success, error) {
      if  (typeof(success) !== "function" || typeof(error) !== "function") {
        throw "The suministred parameters must be functions";
      }

      $.ajax({
        url: this.basePath() + "/auth/login",
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: data,
        success: success,
        error: error
      });
    },
    
    getTables: function(success, error) {
      if  (typeof(success) !== "function" || typeof(error) !== "function") {
        throw "The suministred parameters must be functions";
      }

      $.ajax({
        url: this.basePath() + "/api/tables",
        type: "GET",
        dataType: "json",
        headers: {
          Authorization: Stg.get()
        },
        success: success,
        error: error
      });
    },
    
    getTable: function(tableId, success, error) {
      if  (typeof(success) !== "function" || typeof(error) !== "function") {
        throw "The suministred parameters must be functions";
      }

      $.ajax({
        url: this.basePath() + "/api/votes/" + tableId,
        type: "GET",
        dataType: "json",
        headers: {
          Authorization: Stg.get()
        },
        success: success,
        error: error
      });
    },
    
    registerTable: function(data, success, error) {
      if  (typeof(success) !== "function" || typeof(error) !== "function") {
        throw "The suministred parameters must be functions";
      }

      $.ajax({
        url: this.basePath() + "/api/votes",
        type: "POST",
        dataType: "json",
        headers: {
          Authorization: Stg.get()
        },
        data: data,
        success: success,
        error: error
      });
    },
    
    getJoinedTables: function(tableId, success, error) {
      if  (typeof(success) !== "function" || typeof(error) !== "function") {
        throw "The suministred parameters must be functions";
      }

      $.ajax({
        url: this.basePath() + "/api/tables/" + tableId + "/joined",
        type: "GET",
        dataType: "json",
        headers: {
          Authorization: Stg.get()
        },
        success: success,
        error: error
      });
    },
    
    joinTables: function(tableId, data, success, error) {
      if  (typeof(success) !== "function" || typeof(error) !== "function") {
        throw "The suministred parameters must be functions";
      }

      $.ajax({
        url: this.basePath() + "/api/tables/" + tableId + "/join",
        type: "POST",
        dataType: "json",
        headers: {
          Authorization: Stg.get()
        },
        data: data,
        success: success,
        error: error
      });
    },
    
    deleteTableVotes: function(tableId, success, error) {
      if  (typeof(success) !== "function" || typeof(error) !== "function") {
        throw "The suministred parameters must be functions";
      }

      $.ajax({
        url: this.basePath() + "/api/votes/" + tableId,
        type: "DELETE",
        dataType: "json",
        headers: {
          Authorization: Stg.get()
        },
        success: success,
        error: error
      });
    },
    
    getRegisteredTable: function(tableId, success, error) {
      if  (typeof(success) !== "function" || typeof(error) !== "function") {
        throw "The suministred parameters must be functions";
      }
      
      $.ajax({
        url: this.basePath() + "/api/tables/" + tableId + "/joinedregister",
        type: "GET",
        dataType: "json",
        headers: {
          Authorization: Stg.get()
        },
        success: success,
        error: error
      });
    }
    
  }

  return Api;
}) (jQuery);
