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
short static: 22,434,078 ops/sec
static with same radix: 5,757,041 ops/sec
dynamic route: 4,923,625 ops/sec
mixed static dynamic: 6,171,494 ops/sec
long static: 7,193,105 ops/sec
wildcard: 7,320,630 ops/sec
all together: 1,053,227 ops/sec

================================
 find-my-way compiled benchmark
================================
short static: 34,882,661 ops/sec
static with same radix: 25,514,134 ops/sec
dynamic route: 8,473,459 ops/sec
mixed static dynamic: 8,485,437 ops/sec
long static: 37,208,278 ops/sec
wildcard: 10,236,316 ops/sec
all together: 2,492,840 ops/sec

================
 call benchmark
================
short static: 4,126,779 ops/sec
static with same radix: 3,049,304 ops/sec
dynamic route: 886,951 ops/sec
mixed static dynamic: 936,623 ops/sec
long static: 2,024,755 ops/sec
wildcard: 1,229,061 ops/sec
all together: 241,221 ops/sec

================================================
 express benchmark (WARNING: includes handling)
================================================
short static: 2,079,521 ops/sec
static with same radix: 1,687,849 ops/sec
dynamic route: 1,019,757 ops/sec
mixed static dynamic: 747,992 ops/sec
long static: 774,706 ops/sec
wildcard: 578,236 ops/sec
all together: 151,589 ops/sec

======================
 koa-router benchmark
======================
short static: 2,143,931 ops/sec
static with same radix: 2,123,671 ops/sec
dynamic route: 2,079,795 ops/sec
mixed static dynamic: 1,903,657 ops/sec
long static: 2,019,762 ops/sec
wildcard: 2,148,944 ops/sec
all together: 321,534 ops/sec

===========================
 koa-tree-router benchmark
===========================
short static: 32,303,456 ops/sec
static with same radix: 11,497,009 ops/sec
dynamic route: 5,599,664 ops/sec
mixed static dynamic: 6,278,941 ops/sec
long static: 12,502,167 ops/sec
wildcard: 7,987,439 ops/sec
all together: 1,531,280 ops/sec

===============================================
 router benchmark (WARNING: includes handling)
===============================================
short static: 1,953,406 ops/sec
static with same radix: 1,634,856 ops/sec
dynamic route: 1,010,458 ops/sec
mixed static dynamic: 717,379 ops/sec
long static: 759,314 ops/sec
wildcard: 565,624 ops/sec
all together: 148,455 ops/sec

=================
 routr benchmark
=================
short static: 8,865,768 ops/sec
static with same radix: 4,064,152 ops/sec
dynamic route: 1,585,142 ops/sec
mixed static dynamic: 1,046,520 ops/sec
long static: 983,439 ops/sec
wildcard: 687,282 ops/sec
all together: 208,937 ops/sec

=========================
 server-router benchmark
=========================
short static: 2,255,426 ops/sec
static with same radix: 1,680,304 ops/sec
dynamic route: 1,072,326 ops/sec
mixed static dynamic: 1,180,651 ops/sec
long static: 971,399 ops/sec
wildcard: 1,244,617 ops/sec
all together: 209,528 ops/sec

=======================
 trek-router benchmark
=======================
short static: 15,950,892 ops/sec
static with same radix: 7,462,400 ops/sec
dynamic route: 3,139,335 ops/sec
mixed static dynamic: 3,770,860 ops/sec
long static: 8,182,750 ops/sec
wildcard: 5,035,378 ops/sec
all together: 848,873 ops/sec

=======================
 Hono RegExp benchmark
=======================
short static: 16,082,036 ops/sec
static with same radix: 13,607,184 ops/sec
dynamic route: 4,338,180 ops/sec
mixed static dynamic: 4,336,028 ops/sec
long static: 10,644,177 ops/sec
wildcard: 4,783,642 ops/sec
all together: 1,060,734 ops/sec

===========================
 Hono TrieRouter benchmark
===========================
short static: 2,892,199 ops/sec
static with same radix: 2,064,644 ops/sec
dynamic route: 761,001 ops/sec
mixed static dynamic: 1,368,450 ops/sec
long static: 950,422 ops/sec
wildcard: 1,920,641 ops/sec
all together: 242,322 ops/sec

======================
 Hono Smart benchmark
======================
short static: 2,859,088 ops/sec
static with same radix: 2,112,066 ops/sec
dynamic route: 786,114 ops/sec
mixed static dynamic: 1,409,954 ops/sec
long static: 970,022 ops/sec
wildcard: 1,791,787 ops/sec
all together: 234,531 ops/sec

================
 rou3 benchmark
================
short static: 23,322,295 ops/sec
static with same radix: 14,608,921 ops/sec
dynamic route: 1,184,723 ops/sec
mixed static dynamic: 1,289,727 ops/sec
long static: 10,652,103 ops/sec
wildcard: 1,083,790 ops/sec
all together: 320,282 ops/sec

=========================
 rou3 compiled benchmark
=========================
short static: 80,895,759 ops/sec
static with same radix: 43,523,067 ops/sec
dynamic route: 3,290,384 ops/sec
mixed static dynamic: 3,978,541 ops/sec
long static: 52,341,902 ops/sec
wildcard: 4,083,133 ops/sec
all together: 1,146,978 ops/sec

=======================================
 rou3 + querystring/decoding benchmark
=======================================
short static: 17,311,314 ops/sec
static with same radix: 9,526,923 ops/sec
dynamic route: 1,056,480 ops/sec
mixed static dynamic: 1,181,231 ops/sec
long static: 4,960,866 ops/sec
wildcard: 1,071,281 ops/sec
all together: 293,447 ops/sec

================================================
 rou3 compiled + querystring/decoding benchmark
================================================
short static: 41,058,811 ops/sec
static with same radix: 19,620,116 ops/sec
dynamic route: 2,620,871 ops/sec
mixed static dynamic: 3,101,327 ops/sec
long static: 7,863,429 ops/sec
wildcard: 3,390,240 ops/sec
all together: 771,881 ops/sec
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
