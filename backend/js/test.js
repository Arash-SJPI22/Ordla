/* import fsPromises from 'fs/promises';

async function getWord(length)
{
    const list = [];

    const data = await fsPromises.readFile('../svenska-ord.json')
    const words = JSON.parse(data);

    words.map(word =>
    {
        if (word.length == length)
        {
            list.push(word.toUpperCase());
        }
    })

    return list;
}

console.log(getWord(8)); */

/* import fs from 'fs';

const data = fs.readFileSync('./svenska-ord.json');
const obj = JSON.parse(data);

console.log(obj); */
/* 
import words from './svenska-ord.json' assert { type: 'json' };
import fs from 'fs';


function getWord()
{
    const list = [];

    words.map(word =>
    {
        if ((word.length > 2) && (word.indexOf('-') == -1) && (word.indexOf(' ') == -1) && (word.indexOf('_') == -1) && (word.indexOf('à') == -1) && (word.indexOf('é') == -1))
        {
            //let data = JSON.stringify(word.toUpperCase())
            list.push(word.toUpperCase());
            
            //fs.writeFileSync('./test.json', data, 'utf-8');
            //const write = fs.createWriteStream('./test.json');
            //write.write(data);
            
        }
        
    })

    //console.log(list);
    const data = JSON.stringify(list, null, 2);

    fs.writeFileSync('./test.json', data, 'utf-8');

    return list;
}
 */
//console.log(getWord());

/* import words from './swedishWords.json' assert { type: 'json' };

function getWord(length)
{
    const list = [];
    words.map(word =>
    {
        if (word.length == length) 
        {
            list.push(word);
        }
    })

    return list;
}

console.log(getWord(5));

//1 word with 28 in length, 5 with 27, 6 with 26 */
// 1 word with length 15 and unique
// at lest 3 words with length 14 an unique

import wordList from "./wordList.js";

let word = wordList(10, true);

console.log(`Word is: ${word} and its lengths is: ${word.length}`);

/* function a () {
    const list = ['a', 'b'];
    console.log(`before: list: ${list}`)
    b(list);
    console.log(`after: list: ${list}`)

}

function b (list) {
    list.push('c');
}

a(); */