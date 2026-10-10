'use strict'

const chalk = require('chalk')

const operations = 1000000

function now () {
  var ts = process.hrtime()
  return (ts[0] * 1e3) + (ts[1] / 1e6)
}

function getOpsSec (ms) {
  return Number(((operations * 1000) / ms).toFixed()).toLocaleString()
}

// Returns a function that makes a new flat one-byte string equal to `str`
// on every call, as the HTTP parser gives a server a new req.url per request.
// Reusing one literal would let V8 caches keyed on the string object
// (internalized-string lookups, the String#split results cache) hide costs
// that real traffic pays.
function fresh (str) {
  const codes = Array.from(str, c => c.charCodeAt(0))
  return () => String.fromCharCode.apply(null, codes)
}

// Time spent making the strings of one test, which print() subtracts.
// Best of two runs, so the first one doubles as a warmup.
function stringCost (...urls) {
  let best = Infinity
  let sink = 0
  for (let run = 0; run < 2; run++) {
    const time = now()
    for (let i = 0; i < operations; i++) {
      for (let j = 0; j < urls.length; j++) sink += urls[j]().length
    }
    best = Math.min(best, now() - time)
  }
  // Reading sink keeps V8 from optimizing the strings away.
  if (sink === 0) throw new Error('no strings were made')
  return best
}

function print (name, time, cost = 0) {
  console.log(chalk.yellow(name), getOpsSec(now() - time - cost), 'ops/sec')
}

function title (name) {
  console.log(chalk.green(`
${'='.repeat(name.length + 2)}
 ${name}
${'='.repeat(name.length + 2)}`))
}

function Queue () {
  this.q = []
  this.running = false
}

Queue.prototype.add = function add (job) {
  this.q.push(job)
  if (!this.running) this.run()
}

Queue.prototype.run = function run () {
  this.running = true
  const job = this.q.shift()
  job(() => {
    if (this.q.length) {
      this.run()
    } else {
      this.running = false
    }
  })
}

module.exports = { now, getOpsSec, print, title, Queue, operations, fresh, stringCost }
