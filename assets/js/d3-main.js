// ===== Exercise 4.3: set up the svg canvas =====

// Select the responsive container and append an svg element to it
const svg = d3.select(".responsive-svg-container")
    .append("svg")
      // viewBox: min-x, min-y, width, height
      // Width is 500 so the chart no longer fits without scales
      .attr("viewBox", "0 0 500 600")
      // Border is only used to see the canvas boundaries while developing
      .style("border", "1px solid black");


// ===== Exercise 4.4: load and prepare the data =====

// d3.csv() reads the file and applies the row conversion function to every row
d3.csv("data/tvBrandCount.csv", d => {
  // Return a new object for each row with correctly typed values
  return {
    brand: d.brand,   // text stays as a string
    count: +d.count   // the + converts the string into a number
  };
}).then(data => {
  // The promise gives us the whole data set as an array of objects
  console.log(data);

  // Basic information about the data set
  console.log(data.length);                    // number of rows
  console.log(d3.max(data, d => d.count));     // largest count
  console.log(d3.min(data, d => d.count));     // smallest count
  console.log(d3.extent(data, d => d.count));  // array with [min, max]

  // Sort the data from the largest count to the smallest count
  data.sort((a, b) => b.count - a.count);
  console.log(data);

  // Pass the prepared data to the function that draws the chart
  drawBarChart(data);
});


// ===== Exercises 4.5 and 4.6: bind the data, scale it and draw the bars =====

const drawBarChart = data => {

  // Linear scale for the counts (continuous data) on the x-axis
  // domain: the values in the data set, from 0 to a bit above the largest count
  // range: the width in svg units that the bars may use (less than the viewBox width)
  const xScale = d3.scaleLinear()
    .domain([0, 1200])
    .range([0, 400]);

  // Band scale for the brands (categorical data) on the y-axis
  // domain: one entry per brand
  // range: the height of the svg, so the bands share the available space
  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, 600])
    // padding adds a gap between the bars (0 = no gap, 1 = no bar)
    .padding(0.2);

  svg
    // Select all rect elements inside the svg (there are none yet)
    .selectAll("rect")
    // Bind one data row to each rect
    .data(data)
    // Create a rect for every data row that has no rect yet
    .join("rect")
      // Class name contains the count so the bars are easy to style or find later
      .attr("class", d => `bar bar-${d.count}`)
      // Width of the bar is the count converted by the linear scale
      .attr("width", d => xScale(d.count))
      // Thickness of the bar is the width of one band
      .attr("height", yScale.bandwidth())
      // Colour of the bars
      .attr("fill", "orange")
      // All bars start at the left edge of the svg
      .attr("x", 0)
      // Vertical position of the bar comes from the band scale for its brand
      .attr("y", d => yScale(d.brand));

};