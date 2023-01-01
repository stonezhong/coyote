#!/bin/sh

mkdir -p js-bundle
npx browserify js/index.js -t babelify -o js-bundle/index.js -d
