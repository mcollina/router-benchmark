'use strict'

const { title, now, print, operations, fresh, stringCost } = require('../utils')
const call = require('call')
const router = new call.Router()

title('call benchmark')

const routes = [
  { method: 'GET', path: '/user' },
  { method: 'GET', path: '/user/comments' },
  { method: 'GET', path: '/user/avatar' },
  { method: 'GET', path: '/user/lookup/username/{username}' },
  { method: 'GET', path: '/user/lookup/email/{address}' },
  { method: 'GET', path: '/event/foo' },
  { method: 'GET', path: '/event/{id}' },
  { method: 'GET', path: '/event/{id}/comments' },
  { method: 'POST', path: '/event/{id}/comment' },
  { method: 'GET', path: '/map/{location}/events' },
  { method: 'GET', path: '/status' },
  { method: 'GET', path: '/very/deeply/nested/route/hello/there' },
  { method: 'GET', path: '/static/{file*}' }
]

function noop () {}
var i = 0
var time = 0
var cost = 0

routes.forEach(route => {
  router.add(route, noop)
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
  router.route('get', shortStatic())
}
print('short static:', time, cost)

cost = stringCost(sameRadix)
time = now()
for (i = 0; i < operations; i++) {
  router.route('get', sameRadix())
}
print('static with same radix:', time, cost)

cost = stringCost(dynamicRoute)
time = now()
for (i = 0; i < operations; i++) {
  router.route('get', dynamicRoute())
}
print('dynamic route:', time, cost)

cost = stringCost(mixedRoute)
time = now()
for (i = 0; i < operations; i++) {
  router.route('get', mixedRoute())
}
print('mixed static dynamic:', time, cost)

cost = stringCost(longStatic)
time = now()
for (i = 0; i < operations; i++) {
  router.route('get', longStatic())
}
print('long static:', time, cost)

cost = stringCost(wildcard)
time = now()
for (i = 0; i < operations; i++) {
  router.route('get', wildcard())
}
print('wildcard:', time, cost)

cost = stringCost(shortStatic, sameRadix, dynamicRoute, mixedRoute, longStatic, wildcard)
time = now()
for (i = 0; i < operations; i++) {
  router.route('get', shortStatic())
  router.route('get', sameRadix())
  router.route('get', dynamicRoute())
  router.route('get', mixedRoute())
  router.route('get', longStatic())
  router.route('get', wildcard())
}
print('all together:', time, cost)
