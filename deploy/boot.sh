#!/bin/sh

export PATH=$HOME/.local/bin:$PATH
cp ./nginx.conf /host/mjm42/nginx.d/default/demystify.conf
nginx -c /host/mjm42/nginx.conf -s reload

echo "Setting up python virtual environment."
cd ../server
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt

cd ..

echo "Killing process on port 21586"
kill $(lsof -t -i:21586)

echo "Killing process on port 6379"
kill $(lsof -t -i:6379)

sleep 1

tmux kill-session -t Redis
tmux kill-session -t RQWorker
tmux kill-session -t Demystify-Viz

echo "Starting tmux session for Redis" 
tmux new-session -d -s Redis "redis-server"

echo "Starting tmux session for RQ" 
tmux new-session -d -s RQWorker "cd server && rq worker"

echo "Starting tmux session for Demystify Visualiser (React/Flask)" 
tmux new-session -d -s Demystify-Viz "cd client && npm install && npm run build && cd ../server && gunicorn -b 127.0.0.1:21586 api:app --log-level debug"
