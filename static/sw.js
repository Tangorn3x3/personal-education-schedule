importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/023e5a0.js",
    "revision": "040d7c4a90fb949b3463fdb8dd8da180"
  },
  {
    "url": "/_nuxt/056284d.js",
    "revision": "fa1a7b3e55f965147e9bcebdb7ce09b0"
  },
  {
    "url": "/_nuxt/0f05b73.js",
    "revision": "5bdd88d387b969c104a1ed732334a9f7"
  },
  {
    "url": "/_nuxt/29ac401.js",
    "revision": "02ced390a95f8fee1595c07ae5bdaf36"
  },
  {
    "url": "/_nuxt/32ed2d7.js",
    "revision": "80e852d1df1a62175049607981b0b4d9"
  },
  {
    "url": "/_nuxt/3c611cc.js",
    "revision": "bcd3f89e2c1a19f2eb826eff8d56d1fc"
  },
  {
    "url": "/_nuxt/3dd3f46.js",
    "revision": "86b55a9a9343929c0072b74964433559"
  },
  {
    "url": "/_nuxt/61c2cfb.js",
    "revision": "76e677f6345387c98e32f76ab6b525cf"
  },
  {
    "url": "/_nuxt/62f9937.js",
    "revision": "b6566ea1ab9e7f4793a9958d677a57f3"
  },
  {
    "url": "/_nuxt/66616a5.js",
    "revision": "71299497fe8d34fe845ccc6374441f7f"
  },
  {
    "url": "/_nuxt/71b31ef.js",
    "revision": "0d833ad33be55a64958656bad03828d5"
  },
  {
    "url": "/_nuxt/80c6fe8.js",
    "revision": "9b29d0230e0b55220740d84460757e35"
  },
  {
    "url": "/_nuxt/b340fe5.js",
    "revision": "8683bfd1724e82cb07c3c0fafa3a98e2"
  },
  {
    "url": "/_nuxt/bdd4985.js",
    "revision": "a16bd82f630b73bad471a1f128f31f3f"
  },
  {
    "url": "/_nuxt/d392d49.js",
    "revision": "75b59ac739e9a8ea63a9a3ecac483412"
  },
  {
    "url": "/_nuxt/dd69938.js",
    "revision": "f886a3c0c953128587e6e0ff2ceeb7fa"
  },
  {
    "url": "/_nuxt/eae72d5.js",
    "revision": "3b2deee0d67e4cdd04b204638305c33f"
  },
  {
    "url": "/_nuxt/ef48b96.js",
    "revision": "c82dbd9423fda468ceb5aedddc2d20f6"
  },
  {
    "url": "/_nuxt/f06f753.js",
    "revision": "cadccd32a6e2dc0f94690477ab960581"
  }
], {
  "cacheId": "Snippeter",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')
