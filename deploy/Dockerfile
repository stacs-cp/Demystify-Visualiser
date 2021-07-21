FROM haskell:9
RUN \
    apt-get update &&\
    apt-get install -y python3-pip git &&\
    git clone https://github.com/mmcilree/Demystify-Visualiser.git \
        /home/DemystifyVisualiser &&\
    cd /home/DemystifyVisualiser &&\
    git checkout f85d1d4aef1cc3497880db1b7218d7424ec85ed7 &&\
    git clone https://github.com/conjure-cp/conjure.git /conjure &&\
    cd /conjure &&\
    git checkout 45b679f183bdf31565b

ENV WORK /conjure
WORKDIR $WORK

RUN make &&\
    make install &&\
    etc/build/install-minion.sh

# Not necessary since the built files are in the repository already

# WORKDIR /home/DemystifyVisualiser/client
# RUN apt -y install nodejs npm
# RUN npm install && npm run build
RUN apt-get install -y --no-install-recommends \
     openjdk-11-jre-headless

WORKDIR /home/DemystifyVisualiser/server
RUN pip3 install -r requirements.txt 
ENV FLASK_ENV production
ENV REDISTOGO_URL redis://redis:6379/0
EXPOSE 5000

CMD ["gunicorn", "--workers", "4", "-b", ":5000", "api:app"]