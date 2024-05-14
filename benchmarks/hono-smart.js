'use strict'

const { title, now, print, operations } = require('../utils')
const { SmartRouter } = require('../node_modules/hono/dist/cjs/router/smart-router')
const { RegExpRouter } = require('../node_modules/hono/dist/cjs/router/reg-exp-router')
const { TrieRouter } = require('../node_modules/hono/dist/cjs/router/trie-router')

const router = new SmartRouter({
  routers: [new RegExpRouter(), new TrieRouter()],
})

title('Hono Smart benchmark')

const routes = [
  { method: 'GET', url: '/user' },
  { method: 'GET', url: '/user/comments' },
  { method: 'GET', url: '/user/avatar' },
  { method: 'GET', url: '/user/lookup/username/:username' },
  { method: 'GET', url: '/user/lookup/email/:address' },

  // Adding this route drastically worsen the performance
  // of the router, because it falls back to TrieRouter.
  { method: 'GET', url: '/event/foo' },

  { method: 'GET', url: '/event/:id' },
  { method: 'GET', url: '/event/:id/comments' },
  { method: 'POST', url: '/event/:id/comment' },
  { method: 'GET', url: '/map/:location/events' },
  { method: 'GET', url: '/status' },
  { method: 'GET', url: '/very/deeply/nested/route/hello/there' },
  { method: 'GET', url: '/static/*' }
]

function noop () {}
var i = 0
var time = 0

routes.forEach(route => {
  router.add(route.method, route.url, noop)
})

time = now()
for (i = 0; i < operations; i++) {
  router.match('GET', '/user')
}
print('short static:', time)

time = now()
for (i = 0; i < operations; i++) {
  router.match('GET', '/user/comments')
}
print('static with same radix:', time)

time = now()
for (i = 0; i < operations; i++) {
  router.match('GET', '/user/lookup/username/john')
}
print('dynamic route:', time)

time = now()
for (i = 0; i < operations; i++) {
  router.match('GET', '/event/abcd1234/comments')
}
print('mixed static dynamic:', time)

time = now()
for (i = 0; i < operations; i++) {
  router.match('GET', '/very/deeply/nested/route/hello/there')
}
print('long static:', time)

time = now()
for (i = 0; i < operations; i++) {
  router.match('GET', '/static/index.html')
}
print('wildcard:', time)

time = now()
for (i = 0; i < operations; i++) {
  router.match('GET', '/user')
  router.match('GET', '/user/comments')
  router.match('GET', '/user/lookup/username/john')
  router.match('GET', '/event/abcd1234/comments')
  router.match('GET', '/very/deeply/nested/route/hello/there')
  router.match('GET', '/static/index.html')
}
print('all together:', time)
