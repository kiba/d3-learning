$(document).ready(function()
{
  var width = 800;
  var height = 600;
  var padding = 40;
  var dataset = [34, 34, 26, 37, 42, 41, 35, 31, 41, 33, 30, 74, 33, 49, 38, 61, 21, 41, 26, 80, 43, 29, 33, 35, 45, 49, 39, 34, 26, 25, 35, 33]
  dataset.sort();

  //Claculate the various values needed for a boxplot.
  var median = d3.median(dataset);
  var q1 = d3.quantile(dataset,0.25);
  var q3 = d3.quantile(dataset,0.75);
  var iqr = q3 - q1;
  var end = q1 - 1.5 * iqr;
  var begin = q3 + 1.5 * iqr;


  var outliers = findOutliers(dataset,begin,end);


  var yScale = d3.scale.linear()
  .domain([0,dataset[dataset.length - 1]])
  .range([height - padding, padding])

  svg = d3.select("body")
    .append("svg")
    .attr("width",width)
    .attr("height",height)

  var iqr_height = yScale(q1) - yScale(q3);
  var rect_x = 50;
  var rect_width = 60;

  plotRect = function (x,y,width,height) {
    svg.append("rect")
      .attr("fill","none")
      .attr("stroke","black")
      .attr("stroke-width",2)
      .attr("x",x)
      .attr("y",yScale(y))
      .attr("width",width)
      .attr("height",height);
  }
  var rect = plotRect(rect_x,q3,rect_width,iqr_height);

  if (end < dataset[0])
    var b_stop = yScale(dataset[0]);
  else
    var b_stop = yScale(end);
  
  middle_x = rect_x + (rect_width / 2)
  var bottom_line = svg.append("line")
    .attr("stroke","black")
    .attr('stroke-width',2)
    .attr("x1",middle_x )
    .attr("y1",yScale(q1))
    .attr("x2",middle_x)
    .attr("y2",b_stop);

  if (begin > dataset[dataset.length - 1])
    var t_stop = yScale(dataset[0]);
  else
    var t_stop = yScale(begin);

  var top_line = svg.append("line")
    .attr("stroke","black")
    .attr("stroke-width",2)
    .attr("x1",middle_x)
    .attr("y1",yScale(q3))
    .attr("x2",middle_x)
    .attr("y2",t_stop);

  median_y = yScale(median);

  var m = svg.append("line")
    .attr("stroke","black")
    .attr("stroke-width",2)
    .attr("x1",rect_x)
    .attr("y1",median_y)
    .attr("x2",rect_x + rect_width)
    .attr("y2",median_y)

  svg.selectAll("circle")
  .data(outliers)
  .enter()
  .append("circle")
  .attr("cx",middle_x)
  .attr("cy", function(o){
    return yScale(o);
  })
  .attr("r", 2);

  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("right")
    .ticks("10")
  
  labels = []
  labels.push({name: "Q1", value: q1});
  labels.push({name: "Q3", value: q3});
  labels.push({name: "M", value: median});
  labels.push({name: "Max", value: dataset[dataset.length - 1]});
  labels.push({name: "Min", value: dataset[0]})
  var text_x = rect_x + rect_width + 5;

  svg.selectAll("text")
    .data(labels)
    .enter()
    .append("text")
    .text(function(l) {return l.name + ": " + l.value;})
    .attr("fill","blue")
    .attr("x",text_x)
    .attr("y",function(l) {return yScale(l.value);});
  
  
  svg.append("g")
    .attr("class","axis")
    .attr("transform","translate(" + padding + ",0")
    .call(yAxis);

});

function findOutliers(dataset,max,min) {
  list = []
  for (var i = 0; i < dataset.length; i++)
  {
    if (dataset[i] > max)
    {
      list.push(dataset[i]);
    }
  }
  
  for (var i = 0; i < dataset.length; i++)
  {
    if (dataset[i] < min)
    {
      list.push(dataset[i]);
    }
  }
  return list;
}
