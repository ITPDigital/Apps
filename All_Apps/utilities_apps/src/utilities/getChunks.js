function chunkArray(myArray, chunk_size, isbrand) {
	let index = 0;
	let arrayLength = myArray.length;
	let tempArray = [];
	let i = 1;

	for (index = 0; index < arrayLength; index += chunk_size) {
		i++;
		console.log("i", index % 2 == 0);
		if (!isbrand) {
			if (i % 2 == 0) {
				chunk_size = 4;
			} else {
				chunk_size = 3;
			}
		}
		myChunk = myArray.slice(index, index + chunk_size);
		// Do something if you want with the group
		tempArray.push(myChunk);
	}

	return tempArray;
}

export default chunkArray;
