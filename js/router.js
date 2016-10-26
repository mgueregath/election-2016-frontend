/**
 * [JavaScript router]
 */
function Router() {
  "use strict";
  this.routes = {};
  this.notFoundPage;
  this.bodyId;

  /**
     * [Set the root page]
     * @param {[string]} route [Route]
     */
  this.setRoot = function (route) {
    this.routes['/'] = route;
  };

  /**
     * [Add a new route]
     * @param {[string]} uri   [Unified resourse identifier]
     * @param {[string]} route [Route]
     */
  this.addRoute = function (uri, route) {
    this.routes[uri] = route;
  };
  /**
     * [Set the default not found page]
     * @param {[string]} page [page destiny]
     */
  this.setNotFoundPage = function (page) {
    this.notFoundPage = page;
  };
  /**
     * [Get de uri's route]
     * @param   {[string]} uri [Unified resourse identifier]
     * @returns {[string]} [destiny]
     */
  this.getRoute = function (uri) {
    //console.log(uri);
    if (uri === undefined || uri === "") {
      return this.routes['/'];
    } else if (this.routes[uri]) {
      return this.routes[uri];
    } else {
      return this.notFoundPage;
    }
  };

  this.setBodyId = function (bodyId) {
    this.bodyId = bodyId;
  };


  this.run = function (getRoute) {
    $(window).on('hashchange', function (event) {
      console.log("ofa");
      $.get(getRoute(document.location.hash.split('#')[1]), function (data) {
        $('#' + this.bodyId).html(data);
      });
    });
    //        window.onhashchange = function(getRoute){
    //            var uri = document.location.hash.split('#')[1];
    //            var route = getRoute(uri);
    //            console.log("Route: ");
    //            xhttp.onreadystatechange = function() {
    //                if (xhttp.readyState == 4 && xhttp.status == 200) {
    //                    document.getElementById(this.bodyId).innerHTML = xhttp.responseText;
    //                }
    //            };
    //            xhttp.open("GET", "/pages/" + route, true);
    //            xhttp.send();
    //
    //        }(this.getRoute);
  };

}