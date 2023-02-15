const cells = document.querySelectorAll(".cell");
let xIsNext = true;

for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", function (e) {
    if (e.target.textContent === "") {
      e.target.textContent = xIsNext ? "X" : "O";
      xIsNext = !xIsNext;
    }
  });
}
