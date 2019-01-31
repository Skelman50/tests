import * as fs from 'fs';


fs.readFile('input.txt', function(err, buf) {
 const read = buf.toString()
 const arr = read.split('\n')
 let result = [];
 for(let i = 0; i < arr.length -1; i++) {
    result.push(eval(arr[i]))
 }
 const write:string = result.join('\n')
 console.log(write)
 fs.writeFile('out.txt', write, function (err) {
    console.log("Successfully Written to File.");
});
});

