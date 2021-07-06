#!/bin/sh

cp ./nginx.conf /host/mjm42/nginx.d/default/demystify.conf
nginx -c /host/mjm42/nginx.conf -s reload

echo "Setting up python virtual environment."
cd ./server
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt

cd ..

echo "Starting tmux session for Demystify Visualiser"

kill $(lsof -t -i:3000)
kill $(lsof -t -i:21586)
kill $(lsof -t -i:6379)
tmux kill-session -t Redis
tmux kill-session -t Demystify-Viz
tmux new-session -d -s Redis "redis-server"
tmux new-session -d -s Demystify-Viz "cd client && npm install && npm run build && cd ../server && rq worker.py && gunicorn -b 127.0.0.1:21586 app:app --log-level debug"
