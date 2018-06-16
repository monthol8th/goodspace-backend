#!/bin/sh
npm i
node_modules/.bin/sequelize db:create
node_modules/.bin/sequelize db:migrate
exec "$@"