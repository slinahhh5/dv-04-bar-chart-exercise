// ===== Exercise 4.3: set up the svg canvas =====

// Select the responsive container and append an svg element to it
const svg = d3.select(".responsive-svg-container")
    .append("svg")
      // viewBox keeps the drawing scalable: min-x, min-y, width, height
      .attr("viewBox", "0 0 1200 1600")
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


// ===== Exercise 4.5: bind the data and draw the bars =====

const drawBarChart = data => {

  // Height of each bar and the gap between two bars (in svg units)
  const barHeight = 20;
  const spacing = 5;

  svg
    // Select all rect elements inside the svg (there are none yet)
    .selectAll("rect")
    // Bind one data row to each rect
    .data(data)
    // Create a rect for every data row that has no rect yet
    .join("rect")
      // Class name contains the count so the bars are easy to style or find later
      .attr("class", d => `bar bar-${d.count}`)
      // Width of the bar is the count of TVs
      .attr("width", d => d.count)
      // All bars have the same height
      .attr("height", barHeight)
      // Colour of the bars
      .attr("fill", "orange")
      // All bars start at the left edge of the svg
      .attr("x", 0)
      // Move each bar down by its position in the array (i) times (barHeight + spacing)
      .attr("y", (d, i) => i * (barHeight + spacing));

};