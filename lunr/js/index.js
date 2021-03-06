/*
Copyright 2017 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

'use strict';

// To build an index:
// node js/index.js < data/data.json > data/index.json

const lunr = require('lunr');
const stdin = process.stdin;
const stdout = process.stdout;
const buffer = [];

stdin.resume();
stdin.setEncoding('utf8');

stdin.on('data', data => {
  buffer.push(data);
});

stdin.on('end', () => {
  var documents = JSON.parse(buffer.join());

  const idx = lunr(function() { // can't seem to use fat arrow :/
    this.ref('location');
    this.ref('lines');
    this.field('speaker');
    this.field('lines');
    for (let doc of documents) {
      this.add(doc);
    }
  });

  stdout.write(JSON.stringify(idx));
});