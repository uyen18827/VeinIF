/**
 * Encode unicode string to base64
 * @param str string to be encoded
 * @returns encoded string
 */
export function b64EncodeUnicode(str: string) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode(parseInt(p1, 16))
    }))
}

/**
 * Decode unicode base64 string
 * @param str base64 string to be decoded
 * @returns decoded string
 */
export function b64DecodeUnicode(str: string) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
}