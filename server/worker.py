import os
import logging
import redis
from rq import Worker, Queue, Connection

"""
Very simple custom rq worker. 

Run with `rq worker` and it will wait for tasks.
"""
listen = ['default']

# Specify an alternative redis location by setting this environment variable/
redis_url = os.getenv('REDISTOGO_URL', 'redis://localhost:6379')

conn = redis.from_url(redis_url)

if __name__ == '__main__':
    with Connection(conn):
        worker = Worker(list(map(Queue, listen)))
        worker.work()
