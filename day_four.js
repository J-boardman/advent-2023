let cards = input.split("\n").map((item) => {
  let [_, winningNumbers, currentNumbers] = item.split(/[:|]+/);
  winningNumbers = winningNumbers.split(" ").filter((item) => item);
  currentNumbers = currentNumbers.split(" ").filter((item) => item);
  return { qty: 1, winningNumbers, currentNumbers };
});

const result = cards.map(
  ({ qty, currentNumbers, winningNumbers }, currentIndex) => {
    for (let i = 0; i < qty; i++) {
      let tally = 0;
      for (let number of winningNumbers) {
        if (currentNumbers.some((item) => item == number)) {
          tally++;
        }
      }

      for (let i = 1; i <= tally; i++) {
        if (cards[currentIndex + i]) cards[currentIndex + i].qty++;
      }
    }
    let total = 0;
    for (let number of winningNumbers) {
      if (currentNumbers.some((item) => item == number)) total++;
    }
    return {
      sum: getSum(total),
      qty: qty,
    };
  }
);

function getSum(tally) {
  let sum = tally ? 1 : 0;
  for (let i = 1; i < tally; i++) {
    sum *= 2;
  }
  return sum;
}