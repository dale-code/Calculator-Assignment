const display = document.getElementById("display");
console.log(display);

document.addEventListener("click", (e) => {
  const el = e.target;
  if (!el.classList.contains("btn")) return;

  const value = el.dataset.value;

  if (el.classList.contains("digit")) {
    display.value += value;
    console.log("Digit clicked:", value);
  }

  if (el.classList.contains("op")) {
    display.value += ` ${value} `;
    console.log("Operator clicked:", value);
  }

  if (el.id === "backspace") {
    display.value = display.value.trimEnd().slice(0, -1);
    console.log("Backspace clicked");
  }

  if (el.id === "clear") {
    display.value = "";
    console.log("Clear clicked");
  }

  if (el.id === "equals") {
    evaluate();
    console.log("Equals clicked");
  }
});

document.addEventListener("keydown", (e) => {
  if ("0123456789.".includes(e.key)) {
    display.value += e.key;
  } else if ("+-*/".includes(e.key)) {
    e.preventDefault();
    display.value += ` ${e.key} `;
  } else if (e.key === "Enter") {
    e.preventDefault();
    evaluate();
  } else if (e.key === "Backspace") {
    display.value = display.value.trimEnd().slice(0, -1);
  } else if (e.key === "Escape") {
    display.value = "";
  }
});

function evaluate() {
  try {
    const expr = display.value
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/−/g, "-")
      .replace(/%/g, "%")
      .replace(/\^/g, "**");

    if (expr.trim() === "") return;

    const result = Function(`return ${expr}`)();
    display.value = result;
    console.log("Result:", result);
  } catch (err) {
    display.value = "Error";
    setTimeout(() => (display.value = ""), 1500);
    console.error("Evaluation error:", err);
  }
}
// scripts.js
// This script handles the calculator's functionality, including button clicks and keyboard input.
