'use strict'

const { title, now, print, operations, fresh, stringCost } = require('../utils')
const router = require('express/lib/router')()

title('express benchmark (WARNING: includes handling)')

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
  if (route.method === 'GET') {
    router.route(route.url).get(noop)
  } else {
    router.route(route.url).post(noop)
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
  router.handle({ method: 'GET', url: shortStatic() })
}
print('short static:', time, cost)

cost = stringCost(sameRadix)
time = now()
for (i = 0; i < operations; i++) {
  router.handle({ method: 'GET', url: sameRadix() })
}
print('static with same radix:', time, cost)

cost = stringCost(dynamicRoute)
time = now()
for (i = 0; i < operations; i++) {
  router.handle({ method: 'GET', url: dynamicRoute() })
}
print('dynamic route:', time, cost)

cost = stringCost(mixedRoute)
time = now()
for (i = 0; i < operations; i++) {
  router.handle({ method: 'GET', url: mixedRoute() }, null, noop)
}
print('mixed static dynamic:', time, cost)

cost = stringCost(longStatic)
time = now()
for (i = 0; i < operations; i++) {
  router.handle({ method: 'GET', url: longStatic() }, null, noop)
}
print('long static:', time, cost)

cost = stringCost(wildcard)
time = now()
for (i = 0; i < operations; i++) {
  router.handle({ method: 'GET', url: wildcard() }, null, noop)
}
print('wildcard:', time, cost)

cost = stringCost(shortStatic, sameRadix, dynamicRoute, mixedRoute, longStatic, wildcard)
time = now()
for (i = 0; i < operations; i++) {
  router.handle({ method: 'GET', url: shortStatic() })
  router.handle({ method: 'GET', url: sameRadix() })
  router.handle({ method: 'GET', url: dynamicRoute() })
  router.handle({ method: 'GET', url: mixedRoute() }, null, noop)
  router.handle({ method: 'GET', url: longStatic() }, null, noop)
  router.handle({ method: 'GET', url: wildcard() }, null, noop)
}
print('all together:', time, cost)
