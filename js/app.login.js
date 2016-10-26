$(document).ready(function () {
  $("button[type=submit]").click(function (e) {
    e.preventDefault();
    var data = {
      "id": parseInt($("#location-id").val()),
      "password": $("#location-password").val()
    }
    Api.login(
      JSON.stringify(data),
      function(data) {
        if (data.result){
          Stg.add(data.data[0].Authorization, data.data[0].name);
          $("#logout").show();
          $(".private").show();
          $("#login").hide();
          window.location.hash = "/mesas";
        }
                
      },
      function(data) {
        $("#information").html("Usuario o contraseña incorrectos");
      }
    )
  });
});