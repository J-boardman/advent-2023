/**
 * @see https://adventofcode.com/2023/day/1 
 * @summary Determines a sum value of a string based on the joint 
 * first and last number values present in each line of a string.
 * @param {String} str
 * @returns The sum value of the joint value of the first and last number
 * of each line in a string.
 * @example calibrationMachine("one2 \n 2one"); // returns 33
 */
function calibrationMachine(str) {
  let splitLines = str.split("\n");

  return splitLines
    .map((line) => {
      let value = "";
      value += extractNumber(line);
      value += extractNumber(reverseString(line));

      return Number(value);
    })
    .reduce((a, b) => a + b, 0);
}

function extractNumber(line) {
  let parsedLetters = "";

  for (let letter of line) {
    parsedLetters += letter;

    if (/[0-9]/.test(letter)) return letter;

    let wordNumber = checkForWordNumber(parsedLetters);
    if (wordNumber) return wordNumber;
  }
}

function reverseString(str) {
  return str.split("").reverse().join("");
}

function checkForWordNumber(str) {
  let validNumbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

  for (let i = 0; i < validNumbers.length; i++) {
    if (str.includes(validNumbers[i])) return i + 1;
    if (reverseString(str).includes(validNumbers[i])) return i + 1;
  }
}