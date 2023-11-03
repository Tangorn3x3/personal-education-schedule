import * as _ from 'lodash'

export function stringHashToArrayIndex(str, arrayLength) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % arrayLength;
}

export function searchInStrings(searchStr, strings = []) {
  searchStr = _.toLower(searchStr)
  for (let i = 0; i < strings.length; i++) {
    if (!strings[i]) continue

    const string = _.toLower(strings[i])

    const transStr = keyboardLayoutToRu(searchStr)

    if (string.includes(searchStr) || string.includes(transStr)) {
      return true;
    }
  }

  return false;
}

export function keyboardLayoutToRu( str ) {
  const replacer = {
    "q":"й", "w":"ц", "e":"у", "r":"к", "t":"е", "y":"н", "u":"г",
    "i":"ш", "o":"щ", "p":"з", "[":"х", "]":"ъ", "a":"ф", "s":"ы",
    "d":"в", "f":"а", "g":"п", "h":"р", "j":"о", "k":"л", "l":"д",
    ";":"ж", "'":"э", "z":"я", "x":"ч", "c":"с", "v":"м", "b":"и",
    "n":"т", "m":"ь", ",":"б", ".":"ю", "/":"."
  };

  return str.replace(/[A-z/,.;\'\]\[]/g, function ( x ){
    return x == x.toLowerCase() ? replacer[ x ] : replacer[ x.toLowerCase() ].toUpperCase();
  });
}
export function keyboardLayoutToEn( str ) {
  const replacer = {
    "й":"q", "ц":"w", "у":"e", "к":"r", "е":"t", "н":"y", "г":"u",
    "ш":"i", "щ":"o", "з":"p", "х":"[", "ъ":"]", "ф":"a", "ы":"s",
    "в":"d", "а":"f", "п":"g", "р":"h", "о":"j", "л":"k", "д":"l",
    "ж":";", "э":"'", "я":"z", "ч":"x", "с":"c", "м":"v", "и":"b",
    "т":"n", "ь":"m", "б":",", "ю":".", ".":"/"
  };

  return str.replace(/[А-я/,.;\'\]\[]/g, function ( x ){
    return x == x.toLowerCase() ? replacer[ x ] : replacer[ x.toLowerCase() ].toUpperCase();
  });
}

export function hasFilter(item, filter) {
  if (!item) return false;
  return _.toLower(item).includes(_.toLower(filter))
}

/* eslint-disable camelcase */
export function strip_html_tags (str) {
  // if ((str===null) || (str===''))
  if ((str === null) || (str === '')) { return false } else { str = str.toString() }
  return str.replace(/<[^>]*>/g, '')
}

const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg
const ARGUMENT_NAMES = /([^\s,]+)/g
export function getParamNames (func) {
  const fnStr = func.toString().replace(STRIP_COMMENTS, '')
  let result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES)
  if (result === null) { result = [] }
  return result
}

/**
 * Формирует путь локализованного сообщения с подствновкой дефолтного пути
 * Если задан путь типа ххх.yyy то считаем, что подставлять ничего не надо
 *
 * @param {String} path
 * @param defaultRootPath
 * @return {String} {*}
 */
export function messagePath (path, defaultRootPath = 'arrival_request_labels') {
  if (_.split(path, '.').length > 1) {
    return path
  } else {
    return `${defaultRootPath}.${path}`
  }
}

/**
 *
 * @param {String} firstname
 * @param {String} lastname
 * @param {String} middlename
 * @return {string}
 */
export function getFullname (firstname, lastname, middlename = null) {
  return `${lastname} ${firstname} ${middlename || ''}`
}

/**
 *
 * @param {String} firstname
 * @param {String} lastname
 * @param {String} middlename
 * @return {string}
 */
export function getFullnameInitials (firstname, lastname, middlename = null) {
  return `${lastname} ${firstname.charAt(0)}. ${middlename ? middlename.charAt(0) + '.' : ''}`
}

/**
 * Получение фамилии и инициалов из цельной строки полного имени
 * @param fullname
 * @return {string}
 */
export function getFullnameInitialsFromString (fullname) {
  const nameArr = _.split(fullname, ' ')
  let result = ''
  switch (nameArr.length) {
    case 2: result = getFullnameInitials(nameArr[0], nameArr[1]); break
    case 3: result = getFullnameInitials(nameArr[0], nameArr[1], nameArr[2]); break
  }
  return result
}

/**
 * Parse string contains user name and lastname
 * @param fullname
 * @return {{firstname: string, lastname: string}}
 */
export function parseFullname (fullname) {
  const nameArr = _.split(fullname, ' ')

  return {
    lastname: nameArr[0],
    firstname: nameArr[1]
  }
}

export function copyToClipboardWithoutNavigator (str) {
  // Create a temp <textarea> element
  const el = document.createElement('textarea')
  el.addEventListener('focusin', e => e.stopPropagation())

  // Set its value to the string that you want copied
  el.value = str

  // Make it readonly to be tamper-proof
  el.setAttribute('readonly', '')

  // Move outside the screen to make it invisible
  el.style.position = 'absolute'
  el.style.left = '-9999px'

  // Append the <textarea> element to the HTML document
  document.body.appendChild(el)

  const selected =
    // Check if there is any content selected previously
    document.getSelection().rangeCount > 0
      // Store selection if found
      ? document.getSelection().getRangeAt(0)
      // Mark as false to know no selection existed before
      : false

  // Select the <textarea> content
  el.select()

  // Copy - only works as a result of a user action (e.g. click events)
  document.execCommand('copy')

  // Remove the <textarea> element
  document.body.removeChild(el)

  // If a selection existed before copying
  if (selected) {
    // Unselect everything on the HTML document
    document.getSelection().removeAllRanges()
    // Restore the original selection
    document.getSelection().addRange(selected)
  }
}

export function copyToClipboard(str) {
  return navigator.clipboard.writeText(str)
}

const base64abc = (() => {
  const abc = []
  const A = 'A'.charCodeAt(0)
  const a = 'a'.charCodeAt(0)
  const n = '0'.charCodeAt(0)
  for (let i = 0; i < 26; ++i) {
    abc.push(String.fromCharCode(A + i))
  }
  for (let i = 0; i < 26; ++i) {
    abc.push(String.fromCharCode(a + i))
  }
  for (let i = 0; i < 10; ++i) {
    abc.push(String.fromCharCode(n + i))
  }
  abc.push('+')
  abc.push('/')
  return abc
})()

export function bytesToBase64 (bytes) {
  let result = ''; let i; const l = bytes.length
  for (i = 2; i < l; i += 3) {
    result += base64abc[bytes[i - 2] >> 2]
    result += base64abc[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)]
    result += base64abc[((bytes[i - 1] & 0x0F) << 2) | (bytes[i] >> 6)]
    result += base64abc[bytes[i] & 0x3F]
  }
  if (i === l + 1) { // 1 octet missing
    result += base64abc[bytes[i - 2] >> 2]
    result += base64abc[(bytes[i - 2] & 0x03) << 4]
    result += '=='
  }
  if (i === l) { // 2 octets missing
    result += base64abc[bytes[i - 2] >> 2]
    result += base64abc[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)]
    result += base64abc[(bytes[i - 1] & 0x0F) << 2]
    result += '='
  }
  return result
}

const utf8encoder = new TextEncoder()

// All solutions at MDN only provide a way to encode a native JS string to UTF-16 base64 string.
// Here, you can apply any encoding supported by TextEncoder.
export function base64utf8encode (str) {
  return bytesToBase64(utf8encoder.encode(str))
}
