$(document).ready(function() {
  var width = 800;
  var height = 600;
  var padding = 40;
  var svg = d3.select("body")
    .append("svg")
    .attr("width",width)
    .attr("height",height);

  var dataset = [
    [new Date("2013-09-08"), 3.04],
    [new Date("2013-09-09"), 3.17],
    [new Date("2013-09-10"), 3.58],
    [new Date("2013-09-11"), 2.21],
    [new Date("2013-09-12"), 4.24],
    [new Date("2013-09-13"), 2.67],
    [new Date("2013-09-14"), 4.81]
  ];

  var xScale = d3.time.scale()
  .domain([dataset[0][0], dataset[dataset.length - 1][0]])
  .range([padding, width - padding * 2]);

  var yScale = d3.scale.linear()
  .domain([0,d3.max(dataset, function(d) {return d[1];})])
  .range([height - padding, padding]);


  var line = d3.svg.line()
  .x(function(d) {return xScale(d[0]);})
  .y(function(d) {return yScale(d[1]);});

  var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient('bottom')
  .ticks(dataset.length);

  var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient("left")
  .ticks(dataset.length + 1);

  svg.append("g")
  .attr("class","axis")
  .attr("transform", "translate(" + padding + ",0)")
  .call(yAxis);

  svg.append("g")
  .attr("class","axis")
  .attr("transform", "translate(0," + (height - padding) + ")")
  .call(xAxis);

  svg.append("path")
  .datum(dataset)
  .attr("class","line")
  .attr("d",line);


  
});
