'use strict'

const { title, now, print, operations, fresh, stringCost } = require('../utils')
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
var cost = 0

routes.forEach(route => {
  router.add(route.method, route.url, noop)
})

const shortStatic = fresh('/user')
const sameRadix = fresh('/user/comments')
const dynamicRoute = fresh('/user/lookup/username/john')
const mixedRoute = fresh('/event/abcd1234/comments')
const longStatic = fresh('/very/deeply/nested/route/hello/there')
const wildcard = fresh('/static/index.html')

cost = stringCost(shortStatic)
time = now()
for (i = 0; i < operations; i++) {
  router.match('GET', shortStatic())
}
print('short static:', time, cost)

cost = stringCost(sameRadix)
time = now()
for (i = 0; i < operations; i++) {
  router.match('GET', sameRadix())
}
print('static with same radix:', time, cost)

cost = stringCost(dynamicRoute)
time = now()
for (i = 0; i < operations; i++) {
  router.match('GET', dynamicRoute())
}
print('dynamic route:', time, cost)

cost = stringCost(mixedRoute)
time = now()
for (i = 0; i < operations; i++) {
  router.match('GET', mixedRoute())
}
print('mixed static dynamic:', time, cost)

cost = stringCost(longStatic)
time = now()
for (i = 0; i < operations; i++) {
  router.match('GET', longStatic())
}
print('long static:', time, cost)

cost = stringCost(wildcard)
time = now()
for (i = 0; i < operations; i++) {
  router.match('GET', wildcard())
}
print('wildcard:', time, cost)

cost = stringCost(shortStatic, sameRadix, dynamicRoute, mixedRoute, longStatic, wildcard)
time = now()
for (i = 0; i < operations; i++) {
  router.match('GET', shortStatic())
  router.match('GET', sameRadix())
  router.match('GET', dynamicRoute())
  router.match('GET', mixedRoute())
  router.match('GET', longStatic())
  router.match('GET', wildcard())
}
print('all together:', time, cost)
