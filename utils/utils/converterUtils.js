import moment from 'moment'

export function epochTimeConvert(time, format = 'dddd, DD MMMM YYYY HH:mm:ss') {
  if (!time) return null

  let inputtext = time

  if ((inputtext >= 10E7) && (inputtext < 18E7)) {
    console.error('Expected a more recent date? You are missing 1 digit.')
  }

  if ((inputtext >= 1E16) || (inputtext <= -1E16)) {
    console.warn("Assuming that this timestamp is in <b>nanoseconds (1 billionth of a second)</b>")
    inputtext = Math.floor(inputtext / 1000000);
  } else if ((inputtext >= 1E14) || (inputtext <= -1E14)) {
    console.warn("Assuming that this timestamp is in <b>microseconds (1/1,000,000 second)</b>")
    inputtext = Math.floor(inputtext / 1000)
  } else if ((inputtext >= 1E11) || (inputtext <= -3E10)) {
    console.warn("Assuming that this timestamp is in <b>milliseconds</b>")
  } else {
    console.warn("Assuming that this timestamp is in <b>seconds</b>")
    if ((inputtext > 1E11) || (inputtext < -1E10)) {
      console.error("Remove the last 3 digits if you are trying to convert milliseconds.")
    }
    inputtext = (inputtext * 1000)
  }
  if (inputtext < -68572224E5) {
    console.error("Dates before 14 september 1752 (pre-Gregorian calendar) are not accurate.")
  }

  return moment(_.toNumber(inputtext)).format(format)
}


export function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}
