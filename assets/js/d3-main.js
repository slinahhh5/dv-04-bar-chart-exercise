// ===== Exercise 4.3: set up the svg canvas =====

// Select the responsive container and append an svg element to it
const svg = d3.select(".responsive-svg-container")
    .append("svg")
      // viewBox: min-x, min-y, width, height
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


// ===== Exercises 4.5 to 4.7: bind the data, scale it, draw the bars and labels =====

const drawBarChart = data => {

  // Space on the left of the bars reserved for the brand labels (Exercise 4.7, step 1)
  const labelWidth = 100;

  // Linear scale for the counts (continuous data) on the x-axis
  // range: the width in svg units the bars may use, leaving room for labels and values
  const xScale = d3.scaleLinear()
    .domain([0, 1200])
    .range([0, 350]);

  // Band scale for the brands (categorical data) on the y-axis
  // range: the height of the svg, so the bands share the available space
  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, 600])
    // padding adds a gap between the bars
    .padding(0.2);

  // Create one group (g) per data row to keep each bar and its labels together
  // The transform moves the whole group down to its vertical position
  const barAndLabel = svg
    .selectAll("g")
    .data(data)
    .join("g")
      .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

  // Add a rectangle (the bar) to each group
  barAndLabel
    .append("rect")
      // Class name contains the count so the bars are easy to style or find later
      .attr("class", d => `bar bar-${d.count}`)
      // Width of the bar is the count converted by the linear scale
      .attr("width", d => xScale(d.count))
      // Thickness of the bar is the width of one band
      .attr("height", yScale.bandwidth())
      // Colour of the bars
      .attr("fill", "orange")
      // Bars start after the space reserved for the labels
      .attr("x", labelWidth)
      // y is 0 because the group is already moved to the right height
      .attr("y", 0);

  // Add the brand name (category label) to each group
  barAndLabel
    .append("text")
      .text(d => d.brand)
      // Right edge of the text sits just before the bars
      .attr("x", labelWidth - 10)
      // Vertically centre the text on the bar
      .attr("y", yScale.bandwidth() / 2 + 4)
      // end = the text finishes at x, giving a right-aligned look
      .attr("text-anchor", "end")
      .style("font-size", "13px");

  // Add the count (value label) at the end of each bar
  barAndLabel
    .append("text")
      .text(d => d.count)
      // Start of the text sits a little after the end of the bar
      .attr("x", d => labelWidth + xScale(d.count) + 5)
      .attr("y", yScale.bandwidth() / 2 + 4)
      .style("font-size", "13px");

};