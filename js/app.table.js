if (tableId === undefined || tableId === null) {
  window.location.hash = "/mesas";
}

$(document).ready( function() {
  
  $("button[type=button]#delete").hide();
  
  Api.getTable(
    tableId,
    function (data) {
      if (data.result === true) {
        var tableResult = data.data[0];
        $("#sabat").val(tableResult.sabat);
        $("#gomez").val(tableResult.gomez);
        $("#ilabaca").val(tableResult.ilabaca);
        $("#carrasco").val(tableResult.carrasco);
        $("#blanks").val(tableResult.blanks);
        $("#nulls").val(tableResult.nulls);
        $("button[type=button]#register").hide();
        $("button[type=button]#delete").show();
      }
    },
    function () {
      
    }
  );
  
  getJoinedTables();
  
  
  $("button[type=button]#register").click(function() {
    $("#table-register-alert").hide();

    if (
      $("#sabat").val() !== "" ||
      $("#gomez").val() !== "" ||
      $("#ilabaca").val() !== "" ||
      $("#carrasco").val() !== "" ||
      $("#blanks").val() !== "" ||
      $("#nulls").val() !== ""
    ) {
      var data = {
        table_id: tableId,
        sabat: $("#sabat").val(),
        gomez: $("#gomez").val(),
        ilabaca: $("#ilabaca").val(),
        carrasco: $("#carrasco").val(),
        blanks: $("#blanks").val(),
        nulls: $("#nulls").val()
      }

      Api.registerTable(
        JSON.stringify(data),
        function(data) {
          if (data.result === true) {
            window.location.hash = "/mesas";
          }
        },
        function(data) {

        }
      );
    } else {
      $("#table-register-alert").show();
    }
    
  });
  
  $("button[type=button]#delete").click(function() {
    Api.deleteTableVotes(
      tableId,
      function (data) {
        $("#sabat").val("");
        $("#gomez").val("");
        $("#ilabaca").val("");
        $("#carrasco").val("");
        $("#blanks").val("");
        $("#nulls").val("");
        $("button[type=button]#register").show();
        $("button[type=button]#delete").hide();
      },
      function () {
        
      }
    )
  });
  
  $("button[type=button]#join").click(function() {
    $('.alert.alert-danger').hide();
    var data = {
      "second_table": $("#select-table").val()
    }
    Api.joinTables(
      tableId,
      JSON.stringify(data),
      function (data) {
        if(data.result === true) {
          getJoinedTables();
          $("#close-modal").trigger("click");
        } else {
          $(".alert.alert-danger").show();
        }
      },
      function () {
        $(".alert.alert-danger").show();
      }
    );
    
  });
  
  $("button[type=button]#show-modal").click(function() {
    Api.getTables(
      function (data) {
        var tables = data.data;
        Api.getJoinedTables(
          tableId,
          function (data) {
            $("#select-table").empty();
            var joinedTables = data.data[0].tables;
            var jT = [];
            $.each(joinedTables, function (index, value) {       
              jT.push(value[0]);
            });
            $.each(tables, function (index, value) {
              if (!isInArray(jT, value.id, true)) {
                var option = '<option value="' + value.id + '">' + value.descriptor + '</option>';
                $("#select-table").append(option);
              }
            });
          },
          function () {
            
          }
        );
      },
      function () {
        
      }    
    );
    
  });
  
  Api.getRegisteredTable(
    tableId,
    function (data) {
      if (data.result){
        if(parseInt(data.data[0].id) !== parseInt(tableId)) {
          $("#table-register-joined").show();
          $("#table-register-joined span").html(data.data[0].descriptor);
          $("form.form-horizontal").hide();
        }
        
      }
      
      
    },
    function () {
      
    }
  );
  
  function isInArray(inArr, id, exists) {
    for (i = 0; i < inArr.length; i++ ) {
      if (inArr[i].id == id) {
        return (exists === true) ? true : inArr[i];
      }
    }
  }
  
  function getJoinedTables() {
    Api.getJoinedTables(
      tableId,
      function (data) {
        if(data.result === true) {
          $("#table .list-group").empty();
          var joindeTables = data.data[0].tables;
          $.each(joindeTables, function (index, value) {
            value = value[0];
            if (value.id !== parseInt(tableId)) {
              var div = '<a href="#/mesas" id="' + value.id + '" class="list-group-item">' + value.descriptor + '</a>';

              $("#table .list-group").append(div);
            } else {
              $("#table-descriptor").html(value.descriptor + " del local " + Stg.getName());
            }
          });
        }
      },
      function () {

      }
    );
  }
  
});