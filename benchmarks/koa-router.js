'use strict'

const { title, now, print, operations, fresh, stringCost } = require('../utils')
const KoaRouter = require('koa-router')
const router = new KoaRouter()

title('koa-router benchmark')

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
  { method: 'GET', url: '/static/(.*)' }
]

function noop () {}
var i = 0
var time = 0
var cost = 0

routes.forEach(route => {
  if (route.method === 'GET') {
    router.get(route.url, noop)
  } else {
    router.post(route.url, noop)
  }
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
  router.match(shortStatic(), 'GET')
}
print('short static:', time, cost)

cost = stringCost(sameRadix)
time = now()
for (i = 0; i < operations; i++) {
  router.match(sameRadix(), 'GET')
}
print('static with same radix:', time, cost)

cost = stringCost(dynamicRoute)
time = now()
for (i = 0; i < operations; i++) {
  router.match(dynamicRoute(), 'GET')
}
print('dynamic route:', time, cost)

cost = stringCost(mixedRoute)
time = now()
for (i = 0; i < operations; i++) {
  router.match(mixedRoute(), 'GET')
}
print('mixed static dynamic:', time, cost)

cost = stringCost(longStatic)
time = now()
for (i = 0; i < operations; i++) {
  router.match(longStatic(), 'GET')
}
print('long static:', time, cost)

cost = stringCost(wildcard)
time = now()
for (i = 0; i < operations; i++) {
  router.match(wildcard(), 'GET')
}
print('wildcard:', time, cost)

cost = stringCost(shortStatic, sameRadix, dynamicRoute, mixedRoute, longStatic, wildcard)
time = now()
for (i = 0; i < operations; i++) {
  router.match(shortStatic(), 'GET')
  router.match(sameRadix(), 'GET')
  router.match(dynamicRoute(), 'GET')
  router.match(mixedRoute(), 'GET')
  router.match(longStatic(), 'GET')
  router.match(wildcard(), 'GET')
}
print('all together:', time, cost)
