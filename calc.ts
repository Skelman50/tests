import * as fs from 'fs';

const readPath = process.argv[2];
const writePath = './out.txt';
const result:any = []

function calculate (a:string,b:string,op:string) {
    if (op === '+') {
        return +(a) + +(b)
    }
    if (op === '-') {
        return +(a) - +(b)
    }
    if (op === '*') {
        return +(a) * +(b)
    }
    if (op === '/') {
        return +(a) / +(b)
    }
}

function validation (string:string):void {
    const toArray = string.split('\n')
    for (let i = 0; i < toArray.length; i++) {
        try{
        const firstArg = toArray[i].split(' ')[0];
        let secondArg = toArray[i].split(' ')[2];
        const operator = toArray[i].split(' ')[1];
        const validSecondArg = secondArg.split('')

        for (let j = 0; j < validSecondArg.length; j++) {
            if (validSecondArg[validSecondArg.length-1]  === ',') {
                validSecondArg.splice(validSecondArg.length-1,1)
                secondArg = validSecondArg.join('')
                break
            }
        }
        if (isNaN(+firstArg)) {
            throw new Error(`First argument on ${i + 1} string isn't a number`)
        }
        if (isNaN(+secondArg)) {
            throw new Error(`Second argument on ${i + 1} string isn't a number`)
        }
        if (operator != '+' && toArray[i].split(' ')[1] != '+' &&
        toArray[i].split(' ')[1] != '+' && toArray[i].split(' ')[1] != '+') {
            throw new Error(`Can't find operator: ${toArray[i].split(' ')[1]} on ${i + 1} string`) 
        }
        result.push(calculate(firstArg, secondArg, operator))
    }catch (err) {
        throw new Error(`Don't valid line ${i + 1}`)
    }
  }
}

const readFile = (path: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!path) {
        reject(new Error('You need provide input path.'));
      }
  
      if (path.indexOf(".txt") === -1) {
        reject(new Error('Unable to read file shuld be .txt'));
      }
  
      fs.readFile(path, "utf8", (err, data) => {
        if (err) {
          reject(err);
        } 
        resolve(data);
      });
    });
  }

  const writeFile = (textFile:any): Promise<void>=> {
      textFile = result.join('\n')
    return new Promise((resolve, reject) => {
      fs.writeFile(writePath, textFile, (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      })
    });
  }

  readFile(readPath)
  .then(data => validation(data))
  .then(writeFile)
  .then(() => console.log(`
      DONE!
  `))
  .catch(err => {
    console.log(`
      Error!
      ${err.message}
    `);
  })
  
