document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll(".key");

  let input = "";
  let resultShown = false;

  function show(value) {
    display.textContent = value || "0";
  }

  function clearAll() {
    input = "";
    show(input);
  }

  function del() {
    input = input.slice(0, -1);
    show(input);
  }

  function calc() {
      const sanitized = input.replace(/[^0-9+\-*/().]/g, "");
      const result = Function(`"use strict"; return (${sanitized})`)();
      show(result);
      input = result.toString();
      resultShown = true;

  }

  buttons.forEach((but) => {
    but.addEventListener("click", () => {
      const value = but.dataset.value;
      const action = but.dataset.action;

      if (action === "clear") return clearAll();
      if (action === "back") return del();
      if (action === "equals") return calc();
      if (action === "paren") {
        const open = (input.match(/\(/g) || []).length;
        const close = (input.match(/\)/g) || []).length;
        input += open > close ? ")" : "(";
        return show(input);
      }

      if (value) {
        if (resultShown && /[0-9.]/.test(value)) input = "";
        resultShown = false;
        input += value;
        show(input);
      }
    });
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") return calc();
    if (e.key === "Backspace") return del();
    if (/^[0-9+*/().-]$/.test(e.key)) {
      input += e.key;
      show(input);
    }
  });

  show(input);
});
