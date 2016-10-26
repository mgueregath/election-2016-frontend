var tableId;
$(document).ready(function () {
  $("#location-name").html(Stg.getName);
  Api.getTables(
  function(data) {
    
    if(data.result == true){
      $.each(data.data, function (index, value) {
        var div = '<a href="#/mesas" id="' 
        + value.id 
        + '" class="list-group-item">'
        + value.descriptor 
        
        if (value.data !== null) {
            div = div + '<span class="badge">Lista</span>';
        }
        div = div + '</a>';
                
        $("#tables .list-group").append(div);
        
        $("#" + value.id +".list-group-item").click(function(e) {
          e.preventDefault();
          tableId = $(this).attr("id");
          window.location.hash = "/mesa";
        });
      });
      
    }
    
  },
  function(data) {
    
  });
});