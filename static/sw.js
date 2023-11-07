importScripts('/personal-education-schedule/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/personal-education-schedule/_nuxt/4778869.js",
    "revision": "4bcfe54bcebabb1d1fd8041a95b1508a"
  },
  {
    "url": "/personal-education-schedule/_nuxt/49aadae.js",
    "revision": "e8c241547afa7e02f527674b4f5aa0f4"
  },
  {
    "url": "/personal-education-schedule/_nuxt/61f0b91.js",
    "revision": "751db414c837207c871b81b592fe8af5"
  },
  {
    "url": "/personal-education-schedule/_nuxt/7096f2b.js",
    "revision": "0f9cd1e5d975f0ae06a5f305c13d8662"
  },
  {
    "url": "/personal-education-schedule/_nuxt/b41da4b.js",
    "revision": "ff3a33309447e2c2a8a3fb0c3b360532"
  },
  {
    "url": "/personal-education-schedule/_nuxt/db255fa.js",
    "revision": "3577fb55436e33cb69fe2454c8933cab"
  },
  {
    "url": "/personal-education-schedule/_nuxt/fbff90a.js",
    "revision": "26d2d90c7e700a6d13ab8cd702e2e5d8"
  }
], {
  "cacheId": "Course Scheduler",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/personal-education-schedule/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')
