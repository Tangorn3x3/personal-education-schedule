importScripts('/personal-education-schedule/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/personal-education-schedule/_nuxt/445da6d.js",
    "revision": "a4ffe02f15fb37770db1d07d1ce1488d"
  },
  {
    "url": "/personal-education-schedule/_nuxt/617c06e.js",
    "revision": "ff061a2a2b06bc1788dc12c4e0877e90"
  },
  {
    "url": "/personal-education-schedule/_nuxt/867b66a.js",
    "revision": "64f1ba81c909d0c39ce9812de1f722d8"
  },
  {
    "url": "/personal-education-schedule/_nuxt/8f081cb.js",
    "revision": "e7af009b36dd0680ec099405b287a85c"
  },
  {
    "url": "/personal-education-schedule/_nuxt/9ff43cf.js",
    "revision": "b4713d8d0a40d270b6508adc92575542"
  },
  {
    "url": "/personal-education-schedule/_nuxt/ba552e2.js",
    "revision": "ecac5fea9a2b9c5f5d11c8c5b6bd9b35"
  },
  {
    "url": "/personal-education-schedule/_nuxt/c013d8b.js",
    "revision": "30da049f46407f3775156a61fbcebcf1"
  }
], {
  "cacheId": "Course Scheduler",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/personal-education-schedule/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')
