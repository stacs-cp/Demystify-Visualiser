#!/bin/sh

# Change these if necessary
FLASK_PORT=21586
REDIS_PORT=6379

# Ensure conjure works correctly
export PATH=$HOME/.local/bin:$PATH

# Export nginx configuration
cp ./nginx.conf /host/$USER/nginx.d/default/demystify.conf
nginx -c /host/$USER/nginx.conf -s reload

echo "Setting up python virtual environment."
cd ../server
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt

cd ..

echo "Killing process on port $FLASK_PORT"
kill $(lsof -t -i:$FLASK_PORT)

echo "Killing process on port $REDIS_PORT"
kill $(lsof -t -i:$REDIS_PORT)

sleep 1

tmux kill-session -t Redis
tmux kill-session -t RQWorker
tmux kill-session -t Demystify-Viz

echo "Starting tmux session for Redis" 
tmux new-session -d -s Redis "redis-server --port $REDIS_PORT"

echo "Starting tmux session for RQ" 
tmux new-session -d -s RQWorker "cd server && rq worker"

echo "Starting tmux session for Demystify Visualiser (React/Flask)" 
tmux new-session -d -s Demystify-Viz "cd client && npm install && npm run build && cd ../server && gunicorn -b 127.0.0.1:$FLASK_PORT api:app --log-level debug"
