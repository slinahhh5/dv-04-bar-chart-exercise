// Step 2: style elements
d3.select("h1")
  .style("color", "lightgreen");

d3.select("footer")
  .style("background-color", "lightgray");

// Step 3: append a paragraph to the container
d3.select(".container")
  .append("p")
    .text("Purchasing a low energy consumption TV will help with your energy bills!")
    .style("font-weight", "bold")
    .style("color", "darkgreen");

// Step 4: append a rect to the svg, then label it
const svg = d3.select("#demo-svg");

svg.append("rect")
    .attr("x", 120)
    .attr("y", 35)
    .attr("width", 200)
    .attr("height", 30)
    .style("fill", "#f4b400");

svg.append("text")
    .attr("x", 10)
    .attr("y", 55)
    .text("Sony bravia67")
    .style("font-size", "14px");

svg.append("text")
    .attr("x", 330)
    .attr("y", 55)
    .text("478 kWh/year")
    .style("font-size", "14px");