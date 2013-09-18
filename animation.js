$(document).ready(function (){
  var width = 800;
  var height = 300;


  var svg = d3.select("body")
    .append("svg")
    .attr("font-family","sans-serif")
    .attr("font-size","0.80em")
    .attr("width",width)
    .attr("height",height);


  var square = svg.append("rect")
    .attr("x",0)
    .attr("y",60)
    .attr("width",60)
    .attr('height',60);

  $("#animate").click(function() {
    console.log("beep");
    square
      .transition()
      .duration(1000)
      .delay(100)
      .ease("circle")
      .attr("x",400);
  })
});  
