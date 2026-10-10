'use strict'

const { title, now, print, operations, fresh, stringCost } = require('../utils')
const router = require('find-my-way')()

title('find-my-way compiled benchmark')

const routes = [
  { method: 'GET', url: '/user' },
  { method: 'GET', url: '/user/comments' },
  { method: 'GET', url: '/user/avatar' },
  { method: 'GET', url: '/user/lookup/username/:username' },
  { method: 'GET', url: '/user/lookup/email/:address' },
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
  router.on(route.method, route.url, noop)
})

router.compile()

const shortStatic = fresh('/user')
const sameRadix = fresh('/user/comments')
const dynamicRoute = fresh('/user/lookup/username/john')
const mixedRoute = fresh('/event/abcd1234/comments')
const longStatic = fresh('/very/deeply/nested/route/hello/there')
const wildcard = fresh('/static/index.html')

cost = stringCost(shortStatic)
time = now()
for (i = 0; i < operations; i++) {
  router.find('GET', shortStatic())
}
print('short static:', time, cost)

cost = stringCost(sameRadix)
time = now()
for (i = 0; i < operations; i++) {
  router.find('GET', sameRadix())
}
print('static with same radix:', time, cost)

cost = stringCost(dynamicRoute)
time = now()
for (i = 0; i < operations; i++) {
  router.find('GET', dynamicRoute())
}
print('dynamic route:', time, cost)

cost = stringCost(mixedRoute)
time = now()
for (i = 0; i < operations; i++) {
  router.find('GET', mixedRoute())
}
print('mixed static dynamic:', time, cost)

cost = stringCost(longStatic)
time = now()
for (i = 0; i < operations; i++) {
  router.find('GET', longStatic())
}
print('long static:', time, cost)

cost = stringCost(wildcard)
time = now()
for (i = 0; i < operations; i++) {
  router.find('GET', wildcard())
}
print('wildcard:', time, cost)

cost = stringCost(shortStatic, sameRadix, dynamicRoute, mixedRoute, longStatic, wildcard)
time = now()
for (i = 0; i < operations; i++) {
  router.find('GET', shortStatic())
  router.find('GET', sameRadix())
  router.find('GET', dynamicRoute())
  router.find('GET', mixedRoute())
  router.find('GET', longStatic())
  router.find('GET', wildcard())
}
print('all together:', time, cost)
