// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const convertDataURIToBinary = (dataURI: any) => {
	// TODO: refactor
	const raw = atob(dataURI);
	const rawLength = raw.length;
	const array = new Uint8Array(new ArrayBuffer(rawLength));

	for (let i = 0; i < rawLength; i++) {
		array[i] = raw.charCodeAt(i);
	}
	return array;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const uint8ToBase64 = (arr: Uint8Array) =>
	btoa(
		Array(arr.length)
			.fill('')
			.map((_, i) => String.fromCharCode(arr[i]))
			.join('')
	);
