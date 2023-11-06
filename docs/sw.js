importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/0cce747.js",
    "revision": "7d7ffcde1b817ebdb694fd2ab715f1c2"
  },
  {
    "url": "/_nuxt/122c214.js",
    "revision": "21e79030b45ede475aa2f735dcfd71ff"
  },
  {
    "url": "/_nuxt/8c349bd.js",
    "revision": "7024ccbe5efc3be02ab419292793ed01"
  },
  {
    "url": "/_nuxt/9a86ee0.js",
    "revision": "f343a00ecf3e1dccc458591ca1ad59b8"
  },
  {
    "url": "/_nuxt/bbb93b0.js",
    "revision": "b3060d2e456975cc684f0dd749e63ab1"
  },
  {
    "url": "/_nuxt/cea3bb2.js",
    "revision": "070835b6db3b6deb0ae98db071081c3b"
  },
  {
    "url": "/_nuxt/fa708ec.js",
    "revision": "e9aa63c094ddf5f29e63116d9887440e"
  }
], {
  "cacheId": "Course Scheduler",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')
