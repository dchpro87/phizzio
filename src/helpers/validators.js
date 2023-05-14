//write a function that takes in a string and returns the string trimmed and with first letter of each word capitalized
//ex: "  hello world" => "Hello World"
//ex: " hElLo wOrLd" => "Hello World"
//ex: "heLlo woRld  " => "Hello World"
//ex: "HELLO WORLD" => "Hello World"
//ex: "helloworld" => "Helloworld"

export function capitalizeName(str) {
  // your code here
  return str
    .trim()
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
