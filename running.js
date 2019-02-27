$.get( "http://localhost:8001/query", function( data ) {
  $.each(data, function () {
    console.log(this);
  });    

},"json");

  