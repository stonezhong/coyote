#!/bin/sh
rm -rf js/coyote
mkdir js/coyote
cp ../../src/*.js js/coyote/
mkdir -p js-bundle
npx browserify js/index.js -t babelify -o js-bundle/index.js -d
