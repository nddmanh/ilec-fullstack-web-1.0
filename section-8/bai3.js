var fs = require('fs');

let directory = 'on_class';
let dirBuf = Buffer.from(directory);

fs.readdir(dirBuf, (err, files) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log(files.join("\n"));
    }
})


