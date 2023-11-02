/* eslint-disable prefer-promise-reject-errors */
export function fileToImageBase64 (file) {
  return new Promise((resolve, reject) => {
    if (typeof FileReader === 'function') {
      const reader = new FileReader()

      reader.onload = (event) => {
        resolve(event.target.result)
      }

      reader.readAsDataURL(file)
    } else {
      reject('FileReader API not supported')
    }
  })
}

/**
 *
 * @param imageBase64Str
 * @param {File} originalFile
 * @param filename
 * @return {File}
 */
export function imageBase64ToFile (imageBase64Str, originalFile, filename = 'file.png') {
  let name = filename
  let type = 'image/png'
  let lastModified = Date.now()
  let size = 0

  if (originalFile) {
    name = originalFile.name
    type = originalFile.type
    lastModified = originalFile.lastModified
    size = originalFile.size
  }

  const file = dataURLtoFile(imageBase64Str, name, { type, lastModified, name, size })
  return file
}

function dataURLtoFile (dataurl, filename, params) {
  const arr = dataurl.split(',')
  // const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], filename, params)
}
