
// Nutrionix API information
var nxAppId = "e1023908";
var nxAppKey = "b27da09f2dfe35098a3ba4733fd361e8";

// Google API key
var gApiKey = "AIzaSyAjnWWbP30ssxxKP-jULse9lWmbR9AIaZ8";



function expandAll(){
  $(".collapsible-header").addClass("active");
  $(".collapsible").collapsible({accordion: false});
}

function collapseAll(){
  $(".collapsible-header").removeClass(function(){
    return "active";
  });
  $(".collapsible").collapsible({accordion: true});
  $(".collapsible").collapsible({accordion: false});
}
        