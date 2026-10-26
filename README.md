# Exercises 4.3 to 4.7: D3 bar chart of TV brands

COS30045 Data Visualisation, Week 4. A horizontal bar chart built with D3.js that shows how many TV models each brand has in the TV energy data set. The chart is added to the energy consumption website from Weeks 0 to 3.

Author: To Quyen Le 105715804
Live site: https://mercury.swin.edu.au/cos30045/s105715804/ex4-bar-chart/index.html

## What the chart shows

- One bar per TV brand (25 brands), sorted from the most models to the fewest.
- The brand name is on the left of each bar and the number of models is at the end of the bar.
- The chart scales to fit its svg, so it works for any window size.

## Exercises covered

| Exercise | What was built |
|---|---|
| 4.3 | Responsive svg container and a test rectangle |
| 4.4 | Loading `tvBrandCount.csv` with `d3.csv`, converting the count to a number, sorting the data |
| 4.5 | Binding the data to `rect` elements and drawing one bar per brand |
| 4.6 | Linear and band scales so the bars fit the svg |
| 4.7 | Groups that keep each bar with its brand label and value label |

## How to run

The data is loaded with `d3.csv`, so the page needs a web server. Opening `index.html` directly from the folder will not load the data.

1. Open the folder in VS Code.
2. Right-click `index.html` and choose **Open with Live Server**.

## Files

```
index.html               home page with the bar chart
about.html               about page
televisions.html         televisions page
data/tvBrandCount.csv    brand and count for each TV brand
assets/js/d3-main.js     D3 code for the bar chart
assets/js/main.js        JavaScript for the rest of the site
assets/css/              styles
assets/img/              images
```

## Data

`data/tvBrandCount.csv` has two columns, `brand` and `count`. It was prepared in KNIME from the TV data set and exported with quotes turned off.

## Main ideas used

- `d3.csv` with a row conversion function, so `count` becomes a number.
- `selectAll().data().join()` to create one element for each row of data.
- `scaleLinear` for the bar width and `scaleBand` for the bar positions and thickness.
- Groups (`g`) with `translate` to keep each bar and its labels together.

## GenAI use

I used Claude (Anthropic) to help with code and explanations, and I tested and changed the code myself. Details are in the separate GenAI declaration document submitted on Canvas.
