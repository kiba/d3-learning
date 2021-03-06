var width = 900;
var height = 500;
var padding = 40;

var svg = d3.select("body")
            .append("svg")
            .attr("font-family","sans-serif")
            .attr("font-size","0.80em")
            .attr("width",width)
            .attr("height",height);

d3.json("googlealert.json", function(data) {
  var dates = [];
  var format = d3.time.format("%Y-%m-%d");
  for (var i = 0; i < data.length; i++)
  {
    dates.push(format.parse(data[i].date));
  }
  var timeScale = d3.time.scale();
  timeScale.domain([dates[0],dates[data.length - 1]]);
  timeScale.range([padding, width - padding * 2]);
  yScale = d3.scale.linear();
  yScale.domain([0,d3.max(data, function(d) {return parseInt(d.links);})]);
  yScale.range([height - padding, padding]);
  svg.selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", function(d,i)
  {
    return timeScale(dates[i]);
  })
  .attr("cy", function(d) {
    return yScale(parseInt(d.links));
  })
  .attr("r", 2);

  var xAxis = d3.svg.axis()
  .scale(timeScale)
  .orient('bottom')
  .ticks(7);

  var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient("left")
  .ticks(7);

  padding -= 1;
  
  svg.append("g")
  .attr("class","axis")
  .attr("transform", "translate(0," + (height - padding) + ")")
  .call(xAxis);

  svg.append("g")
  .attr("class","axis")
  .attr("transform", "translate(" + padding + ",0)")
  .call(yAxis);

  svg.append("text")
  .attr("class", "x label")
  .attr("x", width / 2)
  .attr("y", height - (padding / 2.5))
  .text("Date");

  svg.append("text")
  .attr("class", "y label")
  .attr("font-family","sans-serif")
  .attr("font-size", "0.85em")
  .attr("x", height / 2)
  .attr("y", -padding / 2)
  .attr("transform","rotate(90)")
  .text("Links");
});





