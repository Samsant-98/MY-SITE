(function () {
  "use strict";

  /** @type {HTMLElement | null} */
  const valueElement = document.getElementById("value");
  /** @type {HTMLInputElement | null} */
  const stepInput = /** @type {HTMLInputElement | null} */ (document.getElementById("step"));
  /** @type {HTMLButtonElement | null} */
  const incrementButton = /** @type {HTMLButtonElement | null} */ (document.getElementById("increment"));
  /** @type {HTMLButtonElement | null} */
  const decrementButton = /** @type {HTMLButtonElement | null} */ (document.getElementById("decrement"));
  /** @type {HTMLButtonElement | null} */
  const resetButton = /** @type {HTMLButtonElement | null} */ (document.getElementById("reset"));

  if (!valueElement || !stepInput || !incrementButton || !decrementButton || !resetButton) {
    return;
  }

  /** @type {number} */
  let currentValue = 0;

  function coerceStep(value) {
    const parsed = parseInt(String(value), 10);
    if (Number.isNaN(parsed) || parsed < 1) return 1;
    return parsed;
  }

  function getStep() {
    return coerceStep(stepInput.value);
  }

  function announce(value) {
    const parent = valueElement.parentElement;
    if (parent) {
      parent.setAttribute("aria-label", `Valor atual do contador: ${value}`);
    }
  }

  function render(value) {
    valueElement.textContent = String(value);
    announce(value);
  }

  function setValue(next) {
    currentValue = next;
    render(currentValue);
  }

  function increment() {
    setValue(currentValue + getStep());
  }

  function decrement() {
    setValue(currentValue - getStep());
  }

  function reset() {
    setValue(0);
  }

  // Button interactions
  incrementButton.addEventListener("click", increment);
  decrementButton.addEventListener("click", decrement);
  resetButton.addEventListener("click", reset);

  // Normalize step input
  stepInput.addEventListener("change", function () {
    const normalized = getStep();
    stepInput.value = String(normalized);
  });

  // Keyboard shortcuts (global)
  document.addEventListener("keydown", function (event) {
    // Avoid interfering when typing in inputs other than the body
    const target = /** @type {HTMLElement} */ (event.target);
    const isTypingInNumberInput = target instanceof HTMLInputElement && target.type === "number";
    if (isTypingInNumberInput) {
      return;
    }

    const key = event.key;
    if (key === "ArrowUp" || key === "+" || key === "=") {
      event.preventDefault();
      increment();
      return;
    }
    if (key === "ArrowDown" || key === "-" || key === "_") {
      event.preventDefault();
      decrement();
      return;
    }
    if (key === "r" || key === "R" || key === "0") {
      event.preventDefault();
      reset();
      return;
    }
  });

  // Initial render
  render(currentValue);
})();

