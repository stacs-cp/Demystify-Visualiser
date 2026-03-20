Firstly, build the Docker.

docker build -f Dockerfile . -t demystify-visualiser

To then execute the visualiser, run:

docker run -p 5000:5000 demystify-visualiser

And go with your browser to:

http://localhost:5000/demystify/

(Note that last '/' is necessary, without it the visualiser won't work)

"boot.sh" shows how to run the visualiser without docker. Note you will
probably need to install some software (such as redis), and set up
your web server correctly, to make this work.
