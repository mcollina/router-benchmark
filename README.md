# router-benchmark

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/) [![Build Status](https://travis-ci.org/delvedor/router-benchmark.svg?branch=master)](https://travis-ci.org/delvedor/router-benchmark)

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

This benchmarks aims to test only http routers, so the method handling should be included.  
Do you know other routers? [PR](https://github.com/delvedor/router-benchmark/pulls)! :D

<a name="results"></a>
## Results
*These benchmarks where taken under node v20.12.1, on a MacBook Pro with M1 Max CPU:

```
=======================
 find-my-way benchmark
=======================
short static: 31,072,265 ops/sec
static with same radix: 10,217,209 ops/sec
dynamic route: 5,180,911 ops/sec
mixed static dynamic: 6,341,883 ops/sec
long static: 7,009,262 ops/sec
wildcard: 8,289,926 ops/sec
all together: 1,228,176 ops/sec

================
 call benchmark
================
short static: 10,713,850 ops/sec
static with same radix: 10,135,473 ops/sec
dynamic route: 2,535,578 ops/sec
mixed static dynamic: 2,134,821 ops/sec
long static: 9,980,745 ops/sec
wildcard: 3,069,167 ops/sec
all together: 655,299 ops/sec

================================================
 express benchmark (WARNING: includes handling)
================================================
short static: 4,072,568 ops/sec
static with same radix: 3,500,655 ops/sec
dynamic route: 1,976,253 ops/sec
mixed static dynamic: 1,512,690 ops/sec
long static: 1,655,627 ops/sec
wildcard: 1,212,603 ops/sec
all together: 303,500 ops/sec

======================
 koa-router benchmark
======================
short static: 4,023,621 ops/sec
static with same radix: 3,929,252 ops/sec
dynamic route: 3,800,619 ops/sec
mixed static dynamic: 3,483,180 ops/sec
long static: 3,825,692 ops/sec
wildcard: 3,818,680 ops/sec
all together: 594,568 ops/sec

===========================
 koa-tree-router benchmark
===========================
short static: 41,134,701 ops/sec
static with same radix: 16,229,880 ops/sec
dynamic route: 8,348,122 ops/sec
mixed static dynamic: 10,484,754 ops/sec
long static: 18,349,227 ops/sec
wildcard: 10,624,711 ops/sec
all together: 2,253,815 ops/sec

===============================================
 router benchmark (WARNING: includes handling)
===============================================
short static: 3,912,437 ops/sec
static with same radix: 3,392,388 ops/sec
dynamic route: 1,921,728 ops/sec
mixed static dynamic: 1,495,298 ops/sec
long static: 1,642,796 ops/sec
wildcard: 1,179,037 ops/sec
all together: 289,533 ops/sec

=================
 routr benchmark
=================
short static: 14,551,478 ops/sec
static with same radix: 7,161,966 ops/sec
dynamic route: 2,583,981 ops/sec
mixed static dynamic: 1,598,039 ops/sec
long static: 1,456,027 ops/sec
wildcard: 1,059,326 ops/sec
all together: 319,237 ops/sec

=========================
 server-router benchmark
=========================
short static: 5,512,824 ops/sec
static with same radix: 5,038,429 ops/sec
dynamic route: 3,067,518 ops/sec
mixed static dynamic: 2,984,734 ops/sec
long static: 3,712,515 ops/sec
wildcard: 2,837,728 ops/sec
all together: 548,928 ops/sec

=======================
 trek-router benchmark
=======================
short static: 23,602,464 ops/sec
static with same radix: 11,075,971 ops/sec
dynamic route: 4,874,311 ops/sec
mixed static dynamic: 5,776,478 ops/sec
long static: 14,324,775 ops/sec
wildcard: 7,897,997 ops/sec
all together: 1,385,493 ops/sec

=======================
 Hono RegExp benchmark
=======================
short static: 62,339,604 ops/sec
static with same radix: 76,913,463 ops/sec
dynamic route: 11,485,562 ops/sec
mixed static dynamic: 12,294,238 ops/sec
long static: 78,184,047 ops/sec
wildcard: 13,449,756 ops/sec
all together: 3,662,367 ops/sec

===========================
 Hono TrieRouter benchmark
===========================
short static: 4,583,780 ops/sec
static with same radix: 4,163,564 ops/sec
dynamic route: 1,077,599 ops/sec
mixed static dynamic: 2,226,234 ops/sec
long static: 2,931,620 ops/sec
wildcard: 2,919,422 ops/sec
all together: 480,035 ops/sec

======================
 Hono Smart benchmark
======================
short static: 4,510,261 ops/sec
static with same radix: 4,089,633 ops/sec
dynamic route: 1,068,316 ops/sec
mixed static dynamic: 2,192,891 ops/sec
long static: 2,931,982 ops/sec
wildcard: 2,971,101 ops/sec
all together: 487,912 ops/sec
```

### Run the benchmarks
Do you wan to run the benchmarks by yourself?  
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

<a name="license"></a>
## License

[MIT](https://github.com/delvedor/router-benchmark/blob/master/LICENSE)

Copyright © 2017-2024 Tomas Della Vedova
