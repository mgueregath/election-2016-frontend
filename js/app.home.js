$(document).ready( function () {
  
  Api.getStats(
    function(data){
      if(data.result === true) {
        var results = data.data[0];
        $.getJSON(
          "data.json",
          function(data) {
            displayResult(data, results)
          }
        );
      }
    },
    function(data){
      
    }
  );
  
  
  
  var displayResult = function (data, results) {
    if (results.sabat === null) {
      results.sabat = 0;
    }
    
    if (results.carrasco === null) {
      results.carrasco = 0;
    }
    
    if (results.gomez === null) {
      results.gomez = 0;
    }
    
    if (results.ilabaca === null) {
      results.ilabaca = 0;
    }
    
    if (results.nulls === null) {
      results.nulls = 0;
    }
    
    if (results.blanks === null) {
      results.blanks = 0;
    }
    if (results.total === null) {
      results.total = 1;
    }
    var resultData = [];
    resultData[0] = {
      name: data.sabat.name,
      image: data.sabat.image,
      votes: results.sabat
    }
    
    resultData[1] = {
      name: data.carrasco.name,
      image: data.carrasco.image,
      votes: results.carrasco
    }
    
    resultData[2] = {
      name: data.ilabaca.name,
      image: data.ilabaca.image,
      votes: results.ilabaca
    }
    
    resultData[3] = {
      name: data.gomez.name,
      image: data.gomez.image,
      votes: results.gomez
    }
    
    resultData[4] = {
      name: "Votos blancos",
      image: data.blanks.image,
      votes: results.blanks
    }
    
    resultData[5] = {
      name: "Votos nulos",
      image: data.nulls.image,
      votes: results.nulls
    }
    
    resultData.sort(compare);
    resultData.reverse();
    
    $.each(resultData, function(index, value) {      
      console.log(value.name)
      if((value.name == "Votos blancos" || value.name == "Votos nulos")) {
        var div = '<div class="col-xs-12 col-md-6 candidate">'
        + '<img src="'
        + value.image
        + '" class="img-circle center-block">'
        + '<p class="votes-percentage center-block">'
        + Math.round((value.votes/results.total)*10000)/100
        + '%</p>'
        + '<p class="votes center-block">'
        + value.votes + " votos"
        + '</p>'
        + '<p class="name center-block">'
        + value.name
        + '</p>'
        + '</div>';
        $("#nulls-and-blanks").append(div);

      } else if (index === 0) {
        $("#current-top img").attr("src", value.image);
        $("#current-top .votes").html(value.votes + " votos");
        $("#current-top .votes-percentage").html(Math.round((value.votes/results.total)*10000)/100 + "%");
        $("#current-top .name").html(value.name);
      } else {
        var div = '<div class="col-xs-12 col-md-4 candidate">'
        + '<img src="'
        + value.image
        + '" class="img-circle center-block">'
        + '<p class="votes-percentage center-block">'
        + Math.round((value.votes/results.total)*10000)/100
        + '%</p>'
        + '<p class="votes center-block">'
        + value.votes + " votos"
        + '</p>'
        + '<p class="name center-block">'
        + value.name
        + '</p>'
        + '</div>';
        $("#others-candidates").append(div);
        
      }
    });
    
    
  }
  
  function compare(a,b) {
    if (a.votes < b.votes)
      return -1;
    if (a.votes > b.votes)
      return 1;
    return 0;
  }
  
  
});