import words from './swedishWords.json' assert { type: 'json' }

export default function wordList(length, unique)
{
	const list = [];

	// Removes all words that dosen't match the length
	// removeNonMatchingLength(list, length);
	// Add all words from the JSON file with the right length to list
	addRightLengthWords(list, length);

	// Removes all the unique words from the list
	if (unique) removeNonUnique(list);

	// If there are any words left - picks a random word of the words left (they should all match the critera by now)
	if (list.length > 0)
	{

		return list[randomize(list)];

	} else
	{

		return false;
	}
}

function addRightLengthWords(list, length)
{
	words.map(word =>
	{
		if (word.length == length) list.push(word);
	});
}

function removeNonUnique(list)
{

	for (let i = 0; i < list.length; i++)
	{
		let slicedWord = "";

		for (let j = 0; j < list[i].length; j++)
		{

			if (j < list[i].length - 1)
			{

				slicedWord = list[i].slice(j + 1);

				if (slicedWord.includes(list[i].charAt(j)))
				{

					list.splice(i, 1);

					i--;
					break;
				}
			}
		}
	}

	return list;
}

function removeNonMatchingLength(list, length)
{

	for (let i = 0; i < list.length; i++)
	{

		if (list[i].length != length)
		{

			list.splice(i, 1);
			i--;
		}
	}

	return list;
}

function randomize(list)
{

	return Math.floor(Math.random() * list.length);
}