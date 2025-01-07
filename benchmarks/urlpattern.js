'use strict'

const { title, now, print, operations } = require('../utils')


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

function noop () {}
var i = 0
var time = 0

let methods = { POST: [], GET: [] }
routes.forEach(route => {
  methods[route.method].push(new URLPattern({
    hostname: '*',
    pathname: route.url
  }))
})

function handle (opts) {
  const urls = methods[opts.method]

  for (let url of urls) {
    const res = url.exec(opts.url)
    if (res) {
      return res
    }
  }

  return null
}

time = now()
for (i = 0; i < operations; i++) {
  handle({ method: 'GET', url: 'http://localhost/user' })
}
print('short static:', time)

time = now()
for (i = 0; i < operations; i++) {
  handle({ method: 'GET', url: '/user/comments' })
}
print('static with same radix:', time)

time = now()
for (i = 0; i < operations; i++) {
  handle({ method: 'GET', url: '/user/lookup/username/john' })
}
print('dynamic route:', time)

time = now()
for (i = 0; i < operations; i++) {
  handle({ method: 'GET', url: '/event/abcd1234/comments' })
}
print('mixed static dynamic:', time)

time = now()
for (i = 0; i < operations; i++) {
  handle({ method: 'GET', url: '/very/deeply/nested/route/hello/there' })
}
print('long static:', time)

time = now()
for (i = 0; i < operations; i++) {
  handle({ method: 'GET', url: '/static/index.html' })
}
print('wildcard:', time)

time = now()
for (i = 0; i < operations; i++) {
  handle({ method: 'GET', url: '/user' })
  handle({ method: 'GET', url: '/user/comments' })
  handle({ method: 'GET', url: '/user/lookup/username/john' })
  handle({ method: 'GET', url: '/event/abcd1234/comments' })
  handle({ method: 'GET', url: '/very/deeply/nested/route/hello/there' })
  handle({ method: 'GET', url: '/static/index.html' })
}
print('all together:', time)
