
/**
 * base64字符串转ArrayBuffer
 * @param base64 base64格式的字符串
 * @return ArrayBuffer
 */
export const base64ToArrayBuffer = (base64: string) => {
	let string = window.atob(base64);
	let bytes = new Uint8Array(string.length);
	for (let i = 0; i < string.length; i++) {
		bytes[i] = string.charCodeAt(i);
	}
	return bytes.buffer;
}

/**
 * ArrayBuffer转base64字符串
 * @param ArrayBuffer
 * @return string base64格式的字符串
 */
export const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
	let binary = '';
	let bytes = new Uint8Array(buffer);
	let len = bytes.length;
	for (let i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return window.btoa(binary);
}