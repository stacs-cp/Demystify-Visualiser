#!/bin/sh

cp ./nginx.conf /host/mjm42/nginx.d/default/demystify.conf
nginx -c /host/mjm42/nginx.conf -s reload

echo "Starting tmux session for Demystify Visualiser"

kill $(lsof -t -i:3000)
kill $(lsof -t -i:21586)
tmux kill-session -t Demystify-Viz
tmux new-session -d -s Demystify-Viz "cd client && npm install && npm run build && cd ../server && npm run compile"
