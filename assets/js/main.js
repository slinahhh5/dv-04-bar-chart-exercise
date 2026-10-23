document.addEventListener("DOMContentLoaded", function () {
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // FAQ accordion
  const accordions = document.getElementsByClassName("accordion");
  for (let i = 0; i < accordions.length; i++) {
    accordions[i].addEventListener("click", function () {
      this.classList.toggle("active-accordion");
      this.nextElementSibling.classList.toggle("open");
    });
  }

  // Energy calculator
  const calcBtn = document.getElementById("calculate-btn");
  if (!calcBtn) return;

  const inputs = {
    watts: document.getElementById("watts"),
    hours: document.getElementById("hours"),
    cents: document.getElementById("cents")
  };
  const errorMsg = document.getElementById("error-msg");
  const resultsPanel = document.getElementById("results-panel");
  const chart = document.getElementById("cost-chart");

  function checkInputs() {
    const problems = [];
    const rules = [
      ["watts", "Power", 0, 100000],
      ["hours", "Hours per day", 0, 24],
      ["cents", "Price", 0, 1000]
    ];
    const values = {};

    rules.forEach(function (rule) {
      const key = rule[0], label = rule[1], min = rule[2], max = rule[3];
      const raw = inputs[key].value.trim();
      const num = Number(raw);
      let bad = false;

      if (raw === "") { problems.push(label + " is required."); bad = true; }
      else if (!Number.isFinite(num)) { problems.push(label + " must be a number."); bad = true; }
      else if (num <= min) { problems.push(label + " must be greater than " + min + "."); bad = true; }
      else if (num > max) { problems.push(label + " must be " + max + " or less."); bad = true; }

      inputs[key].classList.toggle("invalid", bad);
      values[key] = num;
    });

    return { problems: problems, values: values };
  }

  function drawChart(monthlyCost) {
    chart.replaceChildren();
    const yearTotal = monthlyCost * 12;
    for (let m = 1; m <= 12; m++) {
      const total = monthlyCost * m;
      const col = document.createElement("div");
      col.className = "col";

      const val = document.createElement("span");
      val.className = "val";
      val.textContent = m === 12 || m === 6 || m === 1 ? "$" + total.toFixed(0) : "";

      const bar = document.createElement("div");
      bar.className = "bar";
      bar.style.height = (total / yearTotal) * 120 + "px";

      const label = document.createElement("span");
      label.className = "month";
      label.textContent = m;

      col.append(val, bar, label);
      chart.appendChild(col);
    }
  }

  function calculate() {
    const check = checkInputs();

    if (check.problems.length > 0) {
      errorMsg.textContent = check.problems.join(" ");
      errorMsg.style.display = "block";
      resultsPanel.style.display = "none";
      return;
    }

    errorMsg.style.display = "none";
    const dailyKwh = (check.values.watts * check.values.hours) / 1000;
    const monthlyKwh = dailyKwh * 30;
    const yearlyKwh = dailyKwh * 365;
    const yearlyCost = (yearlyKwh * check.values.cents) / 100;

    document.getElementById("res-daily").textContent = dailyKwh.toFixed(2);
    document.getElementById("res-monthly").textContent = monthlyKwh.toFixed(2);
    document.getElementById("res-yearly").textContent = yearlyKwh.toFixed(2);
    document.getElementById("res-cost").textContent = yearlyCost.toFixed(2);

    drawChart(yearlyCost / 12);
    resultsPanel.style.display = "block";
  }

  calcBtn.addEventListener("click", calculate);
  Object.values(inputs).forEach(function (input) {
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") calculate();
    });
  });
});
