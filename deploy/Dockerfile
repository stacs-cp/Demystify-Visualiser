FROM custom-conjure
#FROM ghcr.io/conjure-cp/conjure:master

ARG VisualiserVersion=d3606f4d1500578656c1714b48e9f1da035def7d
ARG DemystifyVersion=447a59ccd49ea3c3d90d1fec50652511df97e920
RUN apt update
RUN apt install redis-server git python3 python3-pip -y

RUN pip install --upgrade pip


RUN \
    git clone https://github.com/mmcilree/Demystify-Visualiser.git \
        /home/DemystifyVisualiser &&\
    cd /home/DemystifyVisualiser &&\
    git checkout ${VisualiserVersion}

WORKDIR /home/DemystifyVisualiser/server
RUN pip install -r requirements.txt 
RUN pip install https://github.com/stacs-cp/demystify/tarball/${DemystifyVersion}

ENV FLASK_ENV production

CMD ( \
      redis-server --daemonize yes; \
      rq worker & \
      gunicorn --workers 4 --bind 0.0.0.0:5000 --timeout 120 api:app --log-level debug \
    )