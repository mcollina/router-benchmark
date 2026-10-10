'use strict'

const { title, now, print, operations, fresh, stringCost } = require('../utils')
const router = require('server-router')()

title('server-router benchmark')

const routes = [
  { method: 'GET', url: '/user' },
  { method: 'GET', url: '/user/comments' },
  { method: 'GET', url: '/user/avatar' },
  { method: 'GET', url: '/user/lookup/username/:username' },
  { method: 'GET', url: '/user/lookup/email/:address' },
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
  router.route(route.method, route.url, noop)
})

const shortStatic = fresh('GET/user')
const sameRadix = fresh('GET/user/comments')
const dynamicRoute = fresh('GET/user/lookup/username/john')
const mixedRoute = fresh('GET/event/abcd1234/comments')
const longStatic = fresh('GET/very/deeply/nested/route/hello/there')
const wildcard = fresh('GET/static/index.html')

cost = stringCost(shortStatic)
time = now()
for (i = 0; i < operations; i++) {
  router._router.match(shortStatic())
}
print('short static:', time, cost)

cost = stringCost(sameRadix)
time = now()
for (i = 0; i < operations; i++) {
  router._router.match(sameRadix())
}
print('static with same radix:', time, cost)

cost = stringCost(dynamicRoute)
time = now()
for (i = 0; i < operations; i++) {
  router._router.match(dynamicRoute())
}
print('dynamic route:', time, cost)

cost = stringCost(mixedRoute)
time = now()
for (i = 0; i < operations; i++) {
  router._router.match(mixedRoute())
}
print('mixed static dynamic:', time, cost)

cost = stringCost(longStatic)
time = now()
for (i = 0; i < operations; i++) {
  router._router.match(longStatic())
}
print('long static:', time, cost)

cost = stringCost(wildcard)
time = now()
for (i = 0; i < operations; i++) {
  router._router.match(wildcard())
}
print('wildcard:', time, cost)

cost = stringCost(shortStatic, sameRadix, dynamicRoute, mixedRoute, longStatic, wildcard)
time = now()
for (i = 0; i < operations; i++) {
  router._router.match(shortStatic())
  router._router.match(sameRadix())
  router._router.match(dynamicRoute())
  router._router.match(mixedRoute())
  router._router.match(longStatic())
  router._router.match(wildcard())
}
print('all together:', time, cost)
