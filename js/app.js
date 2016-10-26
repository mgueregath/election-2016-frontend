window.addEventListener('load', function () {
    "use strict";
    var currentPage, parameters, router = new Router(), request;
    router.setBodyId("wrapper");
    router.setRoot('home.html');
    router.setNotFoundPage('404.html');

    router.addRoute('/login', 'login.html');
    router.addRoute('/mesas', 'tables.html');
    router.addRoute('/mesa', 'table.html');

    var changeActive = function (uri) {
        $('.nav li').removeClass('active');
        console.log(uri);
        if (uri !== undefined && uri !== "") {
            $('#' + uri.replace('/', '')).addClass('active');
        } else {
            $('#home').addClass('active');
        }
    };

    window.onhashchange = function () {
        var uri = document.location.hash.split('#')[1];
        var route = router.getRoute(uri);
        if (uri !== undefined && $('#achr-' + uri.split('/')[1]).length === 1) {
            scrollTo('#achr-' + uri.split('/')[1]);
        } else if (uri !== currentPage || uri === undefined) {
            currentPage = uri;
            $('#' + router.bodyId).empty();
            if (request) {
                request.abort();
                request = null;
            }
            request = $.ajax({
              url: "pages/" + route + "?_=" + new Date().getTime(),
                success: function (data) {
                    $('#' + router.bodyId).html(data);

                    if (
                        uri !== undefined && $('#achr-' + uri.split('/')[1]).length === 1
                    ) {
                        scrollTo('#achr-' + uri.split('/')[1]);
                    }
                }
            });
            /*$('#'+router.bodyId).load("pages/" + route, function() {
        if(uri != undefined && $('#achr-' + uri.split('/')[1]).length == 1){
          scrollTo('#achr-' + uri.split('/')[1]);
        }
      }); */
        }
    };

    $(window).trigger("hashchange");

    var scrollTo = function (id) {
        $('html, body').animate({
            scrollTop: $(id).offset().top
        }, 1000);
    };
});

$(document).ready(function () {
  if(Stg.get() !== null) {
    $("#logout").show();
    $(".private").show();
    $("#login").hide();
  } else {
    $("#logout").hide();
    $(".private").hide();
    $("#login").show();
  }
  
  $("#logout").click(function () {
    Stg.remove();
    $("#logout").hide();
    $(".private").hide();
    $("#login").show();
  });
});


var tableId;