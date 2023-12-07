const maxCubeValues = {
    blue: 14,
    green: 13,
    red: 12,
};

// PART ONE 
function partOne(input) {
    return sumArray(gameValidator(input));
}

function gameValidator(games) {
  return splitGameValues(games).map((game, i) => {
      const validThrows = game.map((attempt) => isValidThrow(attempt));
      return validThrows.some((valid) => !valid) ? 0 : i + 1;
    });
}

function isValidThrow({ count, color }) {
    return count <= maxCubeValues[color];
}

// PART TWO
function partTwo(input) {
    const arr = productArray(minimumCubesNeeded(input));
    return sumArray(arr);
}

function minimumCubesNeeded(games) {
  return splitGameValues(games).map((game) => {
    return {
      red: getHighestCount(game, "red"),
      blue: getHighestCount(game, "blue"),
      green: getHighestCount(game, "green"),
    };
  });
}

function getHighestCount(game, color) {
  return game
    .filter((attempt) => attempt.color == color)
    .reduce((a, b) => a.count > b.count ? a : b)
    .count
}

// HELPERS 
function splitGameValues(games) {
  const lines = games.split("\n");

  return lines.map((line) => {
    const values = line.split(":")[1];
    const throws = values.split(/[,;]+/);

    return throws.map((item) => {
      const [count, color] = item.trim().split(" ");
      return { color, count: Number(count) };
    });
  });
}

function sumArray(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

function productArray(arr) {
  return arr.map((value) => {
    let product = 1;
    for (let item in value) {
      product *= value[item];
    }
    return product;
  });
}