#!/bin/bash

rm -f package-lock.json
rm -f yarn.lock
rm -f ./src/shims-tsx.d.ts
rm -f ./src/shims-vue.d.ts

npm run lint || rm -f clean.sh
