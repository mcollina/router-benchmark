'use strict'

const { parse } = require('fast-querystring')

// Wraps a rou3 matcher so that each lookup does the same URL work as
// find-my-way's find(): split off the querystring, decode params when the
// path contains a percent-encoded char, and parse the querystring (skipped
// when it is empty, like find-my-way's default querystringParser).
// rou3 matches against the encoded path, so only the params need decoding.
function withUrlHandling (match) {
  return function find (method, url) {
    let path = url
    let querystring = ''
    let shouldDecodeParam = false

    for (let i = 1; i < url.length; i++) {
      const charCode = url.charCodeAt(i)
      if (charCode === 37) { // '%'
        shouldDecodeParam = true
      } else if (charCode === 63 || charCode === 35) { // '?' or '#'
        path = url.slice(0, i)
        querystring = url.slice(i + 1)
        break
      }
    }

    const route = match(method, path)
    if (route === undefined) return null

    const params = route.params
    if (shouldDecodeParam && params !== undefined) {
      try {
        for (const key in params) {
          params[key] = decodeURIComponent(params[key])
        }
      } catch (err) {
        return null
      }
    }

    return {
      data: route.data,
      params,
      searchParams: querystring.length === 0 ? {} : parse(querystring)
    }
  }
}

module.exports = { withUrlHandling }
