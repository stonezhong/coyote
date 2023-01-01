#!/bin/sh

mkdir -p dist
rm -rf dist/*
npx babel index.js -o dist/index.js
npx babel components.js -o dist/components.js
npx babel utils.js -o dist/utils.js
npx babel debug.js -o dist/debug.js
