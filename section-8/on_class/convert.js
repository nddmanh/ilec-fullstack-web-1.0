var fs = require('fs');

let data = fs.readFileSync('./input.txt', 'utf8');

if (data) {
  const convertedArray = data.split("\n");
  let convertedObject = {};

  for ( let i = 0; i < convertedArray.length; i++) {
    let array = convertedArray[i].split(" "); // ["A", 10]

    if (convertedObject[array[0]]) {
      convertedObject[array[0]] += Number(array[1]);
    } else {
      convertedObject[array[0]] = Number(array[1]);
    }
  }

  let output = '';

  let keys = Object.keys(convertedObject); // ["A", "B", "C"]
  for (let i = 0; i < keys.length; i++) {
    output += `${keys[i]} ${convertedObject[keys[i]]}\n`;
  }

  fs.writeFileSync('output.txt', output);

}