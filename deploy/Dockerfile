FROM haskell:9
RUN \
    apt-get update &&\
    apt-get install -y python3-pip git &&\
    git clone https://github.com/conjure-cp/conjure.git /conjure &&\
    cd /conjure &&\
    git checkout f5233b5b92695f2290622ac7e0dbf8a18a6a1cf8

RUN apt-get install -y --no-install-recommends \
     openjdk-11-jre-headless

ENV WORK /conjure
WORKDIR $WORK

RUN \
    make &&\
    make install &&\
    etc/build/install-minion.sh

# things should be somewhat static up to here to speed up demystify dev

RUN \
    git clone https://github.com/mmcilree/Demystify-Visualiser.git \
        /home/DemystifyVisualiser &&\
    cd /home/DemystifyVisualiser &&\
    git checkout 0657cec8d5e5cdf3e67c7dea8d295c5a44ddcb02

# Not necessary since the built files are in the repository already

# WORKDIR /home/DemystifyVisualiser/client
# RUN apt -y install nodejs npm
# RUN npm install && npm run build

WORKDIR /home/DemystifyVisualiser/server
# Need to run in a venv and update pip 
# to work around bug in pip packaging ( https://github.com/pypa/pip/issues/9348 )
RUN apt-get install -y python3-venv
RUN python3 -m venv env 
RUN . env/bin/activate && pip3 install --upgrade pip
RUN . env/bin/activate && pip3 install -r requirements.txt 
RUN . env/bin/activate && pip3 install https://github.com/stacs-cp/demystify/tarball/01636f8e925b294aed554ef412b340cf31d00f8d
ENV FLASK_ENV production
ENV REDISTOGO_URL redis://redis:6379/0
EXPOSE 5000

CMD . env/bin/activate && gunicorn --workers 4 -b :5000 api:app
