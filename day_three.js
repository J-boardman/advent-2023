function engineSchematics(input) {
  let totalValue = 0;
  let gearValue = 0;

  const lines = input.split("\n");

  lines.map((line, row) => {
    line.split("").map((char, col) => {
      if (!isSymbol(char)) return;

      let validValues = [];
      for (let index of getNumericNeighbors(lines, row, col)) {
        let [row, col] = index;
        let value = lines[row][col];

        for (let i = col + 1; i <= lines[row].length; i++) {
          if (/[0-9]/.test(lines[row][i])) value += lines[row][i];
          else break;
        }

        for (let i = col - 1; i >= 0; i--) {
          if (/[0-9]/.test(lines[row][i])) value = lines[row][i] + value;
          else break;
        }

        if (validValues.some((val) => val == value)) continue;
        
        validValues.push(Number(value));
      }
      if (validValues.length == 2 && char == "*") {
        gearValue += validValues.reduce((a, b) => a * b, 1);
      } else totalValue += validValues.reduce((a, b) => a + b, 0);
    });
  });

  return {
    total: totalValue,
    gears: gearValue,
  };
}
console.log(engineSchematics(input));

function isSymbol(char) {
  const symbols = ["@", "#", "$", "%", "^", "&", "*", "+", "-", "=", "-", "/"];
  return symbols.some((item) => item == char);
}

function getNumericNeighbors(lines, row, col) {
  let validIndexes = [];
  const indexes = createIndexes(row, col);
  for (let index in indexes) {
    let [row, col] = indexes[index];
    if (/[0-9]/.test(lines[row][col])) {
      validIndexes.push(indexes[index]);
    }
  }
  return validIndexes;
}

function createIndexes(row, col) {
  return {
    left: [row - 1, col],
    topLeft: [row - 1, col - 1],
    top: [row, col - 1],
    topRight: [row - 1, col + 1],
    right: [row + 1, col],
    bottomRight: [row + 1, col + 1],
    bottom: [row, col + 1],
    bottomLeft: [row + 1, col - 1],
  };
}
