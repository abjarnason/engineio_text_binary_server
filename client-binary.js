//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var crypto = require('crypto');
var ws = require('engine.io-client')('ws://localhost:3000');
ws.binaryType = 'blob';

var timeout = 2000;

ws.on('open', function open() {
  console.log('connection established\n');
  console.log('timeout:', timeout);
  //var randomBytes = crypto.randomBytes(Math.floor((Math.random() * 1024)) + 1);
  var randomBytes = new Int8Array(5);
  ws.send(randomBytes, {
    binary: true,
    mask: true
  }, function() {
    console.log('sent %d bytes of random binary data', randomBytes.length);
  });
});

ws.on('message', function incomming(blob) {
  console.log('received: %s', blob);
  console.log('\n');
  //timeout += 1000;
  setTimeout(function() {
    console.log('timeout:', timeout);
    //var randomBytes = crypto.randomBytes(Math.floor((Math.random() * 256)) + 1);
    var randomBytes = new Int8Array(5);
    ws.send(randomBytes, {
      binary: true,
      mask: true
    }, function() {
      console.log('sent %d bytes of random binary data', randomBytes.length);
    });
  }, timeout);
});
