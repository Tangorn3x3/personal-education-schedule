importScripts('/personal-education-schedule/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/personal-education-schedule/_nuxt/0cce747.js",
    "revision": "7d7ffcde1b817ebdb694fd2ab715f1c2"
  },
  {
    "url": "/personal-education-schedule/_nuxt/122c214.js",
    "revision": "21e79030b45ede475aa2f735dcfd71ff"
  },
  {
    "url": "/personal-education-schedule/_nuxt/60f9e05.js",
    "revision": "962859cd26ab8020951ec9c63e843f9b"
  },
  {
    "url": "/personal-education-schedule/_nuxt/8c349bd.js",
    "revision": "7024ccbe5efc3be02ab419292793ed01"
  },
  {
    "url": "/personal-education-schedule/_nuxt/bbb93b0.js",
    "revision": "b3060d2e456975cc684f0dd749e63ab1"
  },
  {
    "url": "/personal-education-schedule/_nuxt/c4a822c.js",
    "revision": "409d498e47884e76cde579b3efb9894c"
  },
  {
    "url": "/personal-education-schedule/_nuxt/fa708ec.js",
    "revision": "e9aa63c094ddf5f29e63116d9887440e"
  }
], {
  "cacheId": "Course Scheduler",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/personal-education-schedule/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')
