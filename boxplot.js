$(document).ready(function()
{
  var width = 800;
  var height = 600;
  var padding = 40;
  var dataset = [34, 34, 26, 37, 42, 41, 35, 31, 41, 33, 30, 74, 33, 49, 38, 61, 21, 41, 26, 80, 43, 29, 33, 35, 45, 49, 39, 34, 26, 25, 35, 33]
  dataset.sort()

  //Claculate the various values needed for a boxplot.
  median = d3.median(dataset)
  q1 = d3.quantile(dataset,0.25)
  q3 = d3.quantile(dataset,0.75)
  iqr = q3 - q1
  end = q1 - 1.5 * iqr
  begin = q3 + 1.5 * iqr

  outliers = []
  for (var i = 0; i < dataset.length; i++)
  {
    if (dataset[i] > begin)
    {
      outliers.push(dataset[i]);
    }
  }

  for (var i = 0; i < dataset.length; i++)
  {
    if (dataset[i] < end)
    {
      outliers.push(dataset[i]);
    }
  }

  var yScale = d3.scale.linear()
  .domain([0,dataset[dataset.length - 1]])
  .range([height - padding, padding])

  var svg = d3.select("body")
    .append("svg")
    .attr("width",width)
    .attr("height",height)

  iqr_height = yScale(q1) - yScale(q3)
  rect_x = 50
  rect_width = 60
  var rect = svg.append("rect")
    .attr("fill","none")
    .attr("stroke","black")
    .attr("stroke-width",2)
    .attr("x",rect_x)
    .attr("y",yScale(q3))
    .attr("width",rect_width)
    .attr("height",iqr_height);

  if (end < dataset[0])
    b_stop = yScale(dataset[0]);
  else
    b_stop = yScale(end);
  
  middle_x = rect_x + (rect_width / 2)
  var bottom_line = svg.append("line")
    .attr("stroke","black")
    .attr('stroke-width',2)
    .attr("x1",middle_x )
    .attr("y1",yScale(q1))
    .attr("x2",middle_x)
    .attr("y2",b_stop);

  if (begin > dataset[dataset.length - 1])
    t_stop = yScale(dataset[0]);
  else
    t_stop = yScale(begin);

  var top_line = svg.append("line")
    .attr("stroke","black")
    .attr("stroke-width",2)
    .attr("x1",middle_x)
    .attr("y1",yScale(q3))
    .attr("x2",middle_x)
    .attr("y2",t_stop);

  median_y = yScale(median)

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
  
  svg.append("g")
    .attr("class","axis")
    .attr("transform","translate(" + padding + ",0")
    .call(yAxis)

  //Median text
  svg.append("text")
    .attr("font-family","sans-serif")
    .attr("font-size", "0.85em")
    .attr("fill","blue")
    .attr("x",rect_x + rect_width + 5)
    .attr("y",median_y)
    .text("M: " + median)
});
