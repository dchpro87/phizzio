//write a function that takes in a string and returns the string trimmed and with first letter of each word capitalized

export function capitalizeName(str) {
  // your code here
  return str
    .trim()
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
