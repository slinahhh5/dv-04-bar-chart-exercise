// ===== Exercise 4.3: set up the svg canvas =====

// Select the responsive container and append an svg element to it
const svg = d3.select(".responsive-svg-container")
    .append("svg")
      // viewBox keeps the drawing scalable: min-x, min-y, width, height
      .attr("viewBox", "0 0 1200 1600")
      // Border is only used to see the canvas boundaries while developing
      .style("border", "1px solid black");

// Test rectangle with hard-coded attributes (will be replaced by data-driven bars)
svg
  .append("rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 414)
    .attr("height", 16)
    .attr("fill", "blue");


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

  // Pass the prepared data to the function that will draw the chart
  drawBarChart(data);
});


// ===== Placeholder for the next exercise =====

// This function will be built in the next exercise.
// For now it only confirms that the data arrived correctly.
function drawBarChart(data) {
  console.log("drawBarChart received", data.length, "rows");
}