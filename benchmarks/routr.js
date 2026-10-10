'use strict'

const { title, now, print, operations, fresh, stringCost } = require('../utils')
const Routr = require('routr')

title('routr benchmark')

const router = new Routr([
  { name: 'first', method: 'GET', path: '/user' },
  { name: 'second', method: 'GET', path: '/user/comments' },
  { name: 'third', method: 'GET', path: '/user/avatar' },
  { name: 'fourth', method: 'GET', path: '/user/lookup/username/:username' },
  { name: 'fifth', method: 'GET', path: '/user/lookup/email/:address' },
  { name: 'sixth', method: 'get', path: '/event/:id' },
  { name: 'seventh', method: 'get', path: '/event/:id/comments' },
  { name: 'eighth', method: 'post', path: '/event/:id/comment' },
  { name: 'ninth', method: 'get', path: '/map/:location/events' },
  { name: 'tenth', method: 'get', path: '/status' },
  { name: 'eleventh', method: 'get', path: '/very/deeply/nested/route/hello/there' },
  { name: 'twelve', method: 'get', path: '/static/(.*)' }
  // Disabled because not supported
  // { name: 'thirteen', method: 'GET', url: '/event/foo' }
])

var i = 0
var time = 0
var cost = 0

const shortStatic = fresh('/user')
const sameRadix = fresh('/user/comments')
const dynamicRoute = fresh('/user/lookup/username/john')
const mixedRoute = fresh('/event/abcd1234/comments')
const longStatic = fresh('/very/deeply/nested/route/hello/there')
const wildcard = fresh('/static/index.html')

cost = stringCost(shortStatic)
time = now()
for (i = 0; i < operations; i++) {
  router.getRoute(shortStatic(), { method: 'GET' })
}
print('short static:', time, cost)

cost = stringCost(sameRadix)
time = now()
for (i = 0; i < operations; i++) {
  router.getRoute(sameRadix(), { method: 'GET' })
}
print('static with same radix:', time, cost)

cost = stringCost(dynamicRoute)
time = now()
for (i = 0; i < operations; i++) {
  router.getRoute(dynamicRoute(), { method: 'GET' })
}
print('dynamic route:', time, cost)

cost = stringCost(mixedRoute)
time = now()
for (i = 0; i < operations; i++) {
  router.getRoute(mixedRoute(), { method: 'GET' })
}
print('mixed static dynamic:', time, cost)

cost = stringCost(longStatic)
time = now()
for (i = 0; i < operations; i++) {
  router.getRoute(longStatic(), { method: 'GET' })
}
print('long static:', time, cost)

cost = stringCost(wildcard)
time = now()
for (i = 0; i < operations; i++) {
  router.getRoute(wildcard(), { method: 'GET' })
}
print('wildcard:', time, cost)

cost = stringCost(shortStatic, sameRadix, dynamicRoute, mixedRoute, longStatic, wildcard)
time = now()
for (i = 0; i < operations; i++) {
  router.getRoute(shortStatic(), { method: 'GET' })
  router.getRoute(sameRadix(), { method: 'GET' })
  router.getRoute(dynamicRoute(), { method: 'GET' })
  router.getRoute(mixedRoute(), { method: 'GET' })
  router.getRoute(longStatic(), { method: 'GET' })
  router.getRoute(wildcard(), { method: 'GET' })
}
print('all together:', time, cost)
