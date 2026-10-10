'use strict'

/* global URLPattern */

const { title, now, print, operations, fresh, stringCost } = require('../utils')

title('URLPattern benchmark')

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

var i = 0
var time = 0
var cost = 0

const methods = { POST: [], GET: [] }
routes.forEach(route => {
  methods[route.method].push(new URLPattern({
    hostname: '*',
    pathname: route.url
  }))
})

function handle (opts) {
  const urls = methods[opts.method]

  for (const url of urls) {
    const res = url.exec(opts.url)
    if (res) {
      return res
    }
  }

  return null
}

const shortStatic = fresh('/user')
const sameRadix = fresh('/user/comments')
const dynamicRoute = fresh('/user/lookup/username/john')
const mixedRoute = fresh('/event/abcd1234/comments')
const longStatic = fresh('/very/deeply/nested/route/hello/there')
const wildcard = fresh('/static/index.html')

cost = stringCost(shortStatic)
time = now()
for (i = 0; i < operations; i++) {
  handle({ method: 'GET', url: shortStatic() })
}
print('short static:', time, cost)

cost = stringCost(sameRadix)
time = now()
for (i = 0; i < operations; i++) {
  handle({ method: 'GET', url: sameRadix() })
}
print('static with same radix:', time, cost)

cost = stringCost(dynamicRoute)
time = now()
for (i = 0; i < operations; i++) {
  handle({ method: 'GET', url: dynamicRoute() })
}
print('dynamic route:', time, cost)

cost = stringCost(mixedRoute)
time = now()
for (i = 0; i < operations; i++) {
  handle({ method: 'GET', url: mixedRoute() })
}
print('mixed static dynamic:', time, cost)

cost = stringCost(longStatic)
time = now()
for (i = 0; i < operations; i++) {
  handle({ method: 'GET', url: longStatic() })
}
print('long static:', time, cost)

cost = stringCost(wildcard)
time = now()
for (i = 0; i < operations; i++) {
  handle({ method: 'GET', url: wildcard() })
}
print('wildcard:', time, cost)

cost = stringCost(shortStatic, sameRadix, dynamicRoute, mixedRoute, longStatic, wildcard)
time = now()
for (i = 0; i < operations; i++) {
  handle({ method: 'GET', url: shortStatic() })
  handle({ method: 'GET', url: sameRadix() })
  handle({ method: 'GET', url: dynamicRoute() })
  handle({ method: 'GET', url: mixedRoute() })
  handle({ method: 'GET', url: longStatic() })
  handle({ method: 'GET', url: wildcard() })
}
print('all together:', time, cost)
