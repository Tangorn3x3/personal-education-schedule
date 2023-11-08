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
    "url": "/personal-education-schedule/_nuxt/7096f2b.js",
    "revision": "0f9cd1e5d975f0ae06a5f305c13d8662"
  },
  {
    "url": "/personal-education-schedule/_nuxt/a151203.js",
    "revision": "f4d047c8714c31882e7ac3ea7d85bb9a"
  },
  {
    "url": "/personal-education-schedule/_nuxt/db255fa.js",
    "revision": "3577fb55436e33cb69fe2454c8933cab"
  },
  {
    "url": "/personal-education-schedule/_nuxt/db748ae.js",
    "revision": "903ecc6d605a1d7f40dc78ccc1b91308"
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
