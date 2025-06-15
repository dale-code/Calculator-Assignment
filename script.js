const screen = document.getElementById("display");
// Handling clicks from all buttons
document.addEventListener("click", function (evt) {
  const clicked = evt.target;

  // Check if it wasn't a calculator button
  if (!clicked.classList.contains("btn")) return;

  const val = clicked.dataset.value;

  if (clicked.classList.contains("digit")) {
    screen.value += val;
    console.log(`Tapped digit: ${val}`);
  }

  if (clicked.classList.contains("op")) {
    screen.value += ` ${val} `;
    console.log(`Operator chosen: ${val}`);
  }

  // For backspace
  if (clicked.id === "backspace") {
    screen.value = screen.value.trimEnd().slice(0, -1);
    console.log("Backspace hit");
  }

  if (clicked.id === "clear") {
    screen.value = "";
    console.log("Clear all");
  }

  if (clicked.id === "equals") {
    tryEval();
    console.log("Equal clicked");
  }
});

// Keyboard input
document.addEventListener("keydown", function (e) {
  const key = e.key;

  if ("0123456789.".includes(key)) {
    screen.value += key;
  } else if ("+-*/".includes(key)) {
    e.preventDefault();
    screen.value += ` ${key} `;
  } else if (key === "Enter") {
    e.preventDefault();
    tryEval();
  } else if (key === "Backspace") {
    screen.value = screen.value.trimEnd().slice(0, -1);
  } else if (key === "Escape") {
    screen.value = "";
  }
});

// Main evaluation logic
function tryEval() {
  let expression = screen.value;

  //replacement pass for symbols
  expression = expression
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-")
    .replace(/%/g, "%")
    .replace(/\^/g, "**"); 

  if (expression.trim() === "") return;


  try {
    const outcome = Function(`return ${expression}`)();
    screen.value = outcome;
    console.log("Eval result:", outcome);
  } catch (error) {
    screen.value = "Error";
    setTimeout(() => (screen.value = ""), 1500); // reset after showing error
    console.error("Failed to evaluate:", error);
  }
}
