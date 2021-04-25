#!/bin/sh

cp ./nginx.conf /host/mjm42/nginx.d/default/demystify.conf
nginx -c /host/mjm42/nginx.conf -s reload

echo "Starting tmux session for frontend"

kill $(lsof -t -i:3000)
kill $(lsof -t -i:21586)
tmux kill-session -t Demystify-frontend
tmux new-session -d -s Demystify-frontend "npm install && npm run build && node_modules/serve/bin/serve.js -s build -l 21586"
