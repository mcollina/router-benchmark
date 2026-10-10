# router-benchmark

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/) [![CI](https://github.com/mcollina/router-benchmark/actions/workflows/ci.yml/badge.svg)](https://github.com/mcollina/router-benchmark/actions/workflows/ci.yml)

Benchmark of the most commonly used http routers.

Tested routers:

- [find-my-way](https://github.com/delvedor/find-my-way)
- [call](https://github.com/hapijs/call)
- [express](https://www.npmjs.com/package/express)
- [koa-router](https://github.com/alexmingoia/koa-router)
- [koa-tree-router](https://github.com/steambap/koa-tree-router)
- [router](https://github.com/pillarjs/router)
- [routr](https://github.com/yahoo/routr)
- [server-router](https://github.com/yoshuawuyts/server-router)
- [trek-router](https://www.npmjs.com/package/trek-router)
- [hono](https://www.npmjs.com/package/hono)
- [rou3](https://github.com/h3js/rou3)
- [URLPattern](https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API) (built into Node.js)

This benchmarks aims to test only http routers, so the method handling should be included.  
Do you know other routers? [PR](https://github.com/delvedor/router-benchmark/pulls)! :D

<a name="results"></a>
## Results
*These benchmarks were taken under node v24.18.0, on Linux with an Intel Core i7-7700 CPU:

```
=======================
 find-my-way benchmark
=======================
short static: 21,057,446 ops/sec
static with same radix: 7,224,208 ops/sec
dynamic route: 4,482,538 ops/sec
mixed static dynamic: 5,575,220 ops/sec
long static: 7,658,396 ops/sec
wildcard: 6,661,574 ops/sec
all together: 1,153,757 ops/sec

================================
 find-my-way compiled benchmark
================================
short static: 47,980,684 ops/sec
static with same radix: 29,910,749 ops/sec
dynamic route: 9,616,614 ops/sec
mixed static dynamic: 9,143,997 ops/sec
long static: 37,479,748 ops/sec
wildcard: 11,555,538 ops/sec
all together: 2,437,745 ops/sec

================
 call benchmark
================
short static: 4,321,315 ops/sec
static with same radix: 3,283,323 ops/sec
dynamic route: 937,532 ops/sec
mixed static dynamic: 903,877 ops/sec
long static: 2,169,537 ops/sec
wildcard: 1,292,846 ops/sec
all together: 252,690 ops/sec

================================================
 express benchmark (WARNING: includes handling)
================================================
short static: 2,063,437 ops/sec
static with same radix: 1,683,177 ops/sec
dynamic route: 1,016,234 ops/sec
mixed static dynamic: 757,383 ops/sec
long static: 761,344 ops/sec
wildcard: 590,326 ops/sec
all together: 152,523 ops/sec

======================
 koa-router benchmark
======================
short static: 2,307,801 ops/sec
static with same radix: 2,267,584 ops/sec
dynamic route: 2,195,760 ops/sec
mixed static dynamic: 1,957,603 ops/sec
long static: 2,216,872 ops/sec
wildcard: 2,182,663 ops/sec
all together: 351,595 ops/sec

===========================
 koa-tree-router benchmark
===========================
short static: 32,084,476 ops/sec
static with same radix: 12,184,387 ops/sec
dynamic route: 5,017,496 ops/sec
mixed static dynamic: 6,540,487 ops/sec
long static: 12,044,528 ops/sec
wildcard: 7,031,613 ops/sec
all together: 1,453,975 ops/sec

===============================================
 router benchmark (WARNING: includes handling)
===============================================
short static: 1,944,898 ops/sec
static with same radix: 1,591,226 ops/sec
dynamic route: 934,674 ops/sec
mixed static dynamic: 727,230 ops/sec
long static: 756,855 ops/sec
wildcard: 584,156 ops/sec
all together: 142,966 ops/sec

=================
 routr benchmark
=================
short static: 9,188,543 ops/sec
static with same radix: 4,598,528 ops/sec
dynamic route: 1,624,810 ops/sec
mixed static dynamic: 1,057,241 ops/sec
long static: 994,278 ops/sec
wildcard: 657,219 ops/sec
all together: 195,405 ops/sec

=========================
 server-router benchmark
=========================
short static: 2,207,237 ops/sec
static with same radix: 1,700,486 ops/sec
dynamic route: 1,102,549 ops/sec
mixed static dynamic: 1,217,543 ops/sec
long static: 972,661 ops/sec
wildcard: 1,221,399 ops/sec
all together: 203,743 ops/sec

=======================
 trek-router benchmark
=======================
short static: 14,187,443 ops/sec
static with same radix: 7,582,664 ops/sec
dynamic route: 3,239,444 ops/sec
mixed static dynamic: 3,746,396 ops/sec
long static: 8,684,220 ops/sec
wildcard: 5,015,001 ops/sec
all together: 865,727 ops/sec

=======================
 Hono RegExp benchmark
=======================
short static: 15,769,584 ops/sec
static with same radix: 13,561,221 ops/sec
dynamic route: 4,173,271 ops/sec
mixed static dynamic: 4,272,166 ops/sec
long static: 10,473,110 ops/sec
wildcard: 4,819,774 ops/sec
all together: 1,118,697 ops/sec

===========================
 Hono TrieRouter benchmark
===========================
short static: 2,818,041 ops/sec
static with same radix: 2,119,972 ops/sec
dynamic route: 779,480 ops/sec
mixed static dynamic: 1,411,371 ops/sec
long static: 987,229 ops/sec
wildcard: 1,995,426 ops/sec
all together: 248,353 ops/sec

======================
 Hono Smart benchmark
======================
short static: 2,860,529 ops/sec
static with same radix: 2,090,676 ops/sec
dynamic route: 797,583 ops/sec
mixed static dynamic: 1,320,004 ops/sec
long static: 988,519 ops/sec
wildcard: 1,950,177 ops/sec
all together: 248,473 ops/sec

================
 rou3 benchmark
================
short static: 21,256,541 ops/sec
static with same radix: 14,387,200 ops/sec
dynamic route: 1,228,020 ops/sec
mixed static dynamic: 1,336,753 ops/sec
long static: 11,457,492 ops/sec
wildcard: 1,141,310 ops/sec
all together: 337,018 ops/sec

=========================
 rou3 compiled benchmark
=========================
short static: 76,811,147 ops/sec
static with same radix: 72,263,019 ops/sec
dynamic route: 3,418,536 ops/sec
mixed static dynamic: 4,151,834 ops/sec
long static: 52,450,483 ops/sec
wildcard: 4,158,566 ops/sec
all together: 1,196,186 ops/sec

=======================================
 rou3 + querystring/decoding benchmark
=======================================
short static: 17,015,996 ops/sec
static with same radix: 8,722,335 ops/sec
dynamic route: 1,101,664 ops/sec
mixed static dynamic: 1,190,895 ops/sec
long static: 4,958,927 ops/sec
wildcard: 1,051,333 ops/sec
all together: 291,605 ops/sec

================================================
 rou3 compiled + querystring/decoding benchmark
================================================
short static: 40,727,358 ops/sec
static with same radix: 19,478,483 ops/sec
dynamic route: 2,550,221 ops/sec
mixed static dynamic: 2,951,618 ops/sec
long static: 7,904,642 ops/sec
wildcard: 3,266,438 ops/sec
all together: 744,739 ops/sec

======================
 URLPattern benchmark
======================
short static: 111,536 ops/sec
static with same radix: 109,250 ops/sec
dynamic route: 84,467 ops/sec
mixed static dynamic: 64,938 ops/sec
long static: 61,798 ops/sec
wildcard: 56,983 ops/sec
all together: 12,446 ops/sec
```

### Run the benchmarks
Do you wan to run the benchmarks by yourself?  
You need Node.js 22.12 or later (rou3 is ESM only and is loaded with `require`).  
Run the following:
```bash
git clone https://github.com/delvedor/router-benchmark
cd router-benchmark
npm i
npm start
```

<a name="features"></a>
## Router features
| Router            | Framework independent | Decode URI    | Querystring handling  |  Regex route support  | Multi-parametric route support    |  Max parameter length | Mix Params and Static paths   |
| :---------------- | :-------------------- | :------------ | :-------------------- | :-------------------- |:--------------------------------- |:--------------------- |:----------------------------- |
| `find-my-way`     | &#10003;              | &#10003;      | &#10003;              | &#10003;              | &#10003;                          | &#10003;              | &#10003;                      |
| `find-my-way compiled`| &#10003;              | &#10003;      | &#10003;              | &#10003;              | &#10003;                          | &#10003;              | &#10003;                      |
| `call`            | &#10003;              | &#10003;      | &#10007;              | ?                     | ?                                 | ?                     | &#10003;                      |
| `express`         | &#10007;              | &#10003;      | &#10003;              | &#10003;              | &#10003;                          | &#10007;              | &#10003;                      |
| `koa-router`      | &#10007;              | &#10007;      | &#10007;              | &#10003;              | &#10003;                          | &#10007;              | &#10003;                      |
| `koa-tree-router` | &#10007;              | &#10007;      | &#10007;              | &#10007;              | &#10007;                          | &#10007;              | &#10007;                      |
| `router`          | &#10003;              | &#10003;      | &#10003;              | &#10003;              | &#10003;                          | &#10007;              | &#10003;                      |
| `routr`           | &#10003;              | &#10003;      | &#10003;              | &#10007;              | &#10007;                          | &#10007;              | &#10007;                      |
| `server-router`   | &#10003;              | &#10003;      | &#10007;              | &#10007;              | &#10007;                          | &#10007;              | &#10003;                      |
| `trek-router`     | &#10007;              | &#10007;      | &#10007;              | &#10007;              | &#10007;                          | &#10007;              | &#10003;                      |
| `hono Trie`       | &#10007;              | &#10003;      | &#10007;              | &#10003;              | &#10003;                          | &#10007;              | &#10003;                      |
| `hono RegExp`     | &#10007;              | &#10003;      | &#10007;              | &#10003;              | &#10007;                          | &#10007;              | &#10007;                      |
| `hono Smart`      | &#10007;              | &#10003;      | &#10007;              | &#10003;              | &#10003;                          | &#10007;              | &#10003;                      |
| `rou3`            | &#10003;              | &#10007;      | &#10007;              | &#10003;              | &#10003;                          | &#10007;              | &#10003;                      |
| `URLPattern`      | &#10003;              | &#10007;      | &#10003;              | &#10003;              | &#10003;                          | &#10007;              | &#10003;                      |

*Did you find incorrect data in the above table? Please send a pr!*

<a name="how"></a>
## How the benchmark is taken

To emulate a real world situation every router registers the following routes:
```
{ method: 'GET', url: '/user' },
{ method: 'GET', url: '/user/comments' },
{ method: 'GET', url: '/user/avatar' },
{ method: 'GET', url: '/user/lookup/username/:username' },
{ method: 'GET', url: '/user/lookup/email/:address' },
{ method: 'GET', url: '/event/foo' }, // for the routers that supports this
{ method: 'GET', url: '/event/:id' },
{ method: 'GET', url: '/event/:id/comments' },
{ method: 'POST', url: '/event/:id/comment' },
{ method: 'GET', url: '/map/:location/events' },
{ method: 'GET', url: '/status' },
{ method: 'GET', url: '/very/deeply/nested/route/hello/there' },
{ method: 'GET', url: '/static/*' }
```

Then the following routes are tested:
```
short static: { method: 'GET', url: '/user' }
static with same radix: { method: 'GET', url: '/user/comments' }
dynamic route: { method: 'GET', url: '/user/lookup/username/john' }
mixed static dynamic: { method: 'GET', url: '/event/abcd1234/comments' },
long static: { method: 'GET', url: '/very/deeply/nested/route/hello/there' },
wildcard: { method: 'GET', url: '/static/index.html' }
all together: all the above at the same time
```
Every test is executed 1 million times, the time is taken with `process.hrtime()`, the final result is expressed in operations per second.

Every lookup gets a new URL string, built with `String.fromCharCode` like the `req.url` a server gets for each request. Reusing one string literal would let V8 caches keyed on the string (internalized-string lookups, the `String#split` results cache) make some routers look faster than they are on real traffic. The time spent building the strings is measured separately and subtracted from the results.

<a name="license"></a>
## License

[MIT](https://github.com/delvedor/router-benchmark/blob/master/LICENSE)

Copyright © 2017-2024 Tomas Della Vedova
