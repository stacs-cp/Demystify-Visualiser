FROM node:16
RUN \
    apt-get update &&\
    apt-get install -y python3-pip git &&\
    git clone https://github.com/mmcilree/Demystify-Visualiser.git \
        /home/DemystifyVisualiser

WORKDIR /home/DemystifyVisualiser/client
RUN npm install && npm run build

WORKDIR /home/DemystifyVisualiser/server
RUN pip3 install -r requirements.txt 
ENV FLASK_ENV production
ENV REDISTOGO_URL redis://redis:6379/0
EXPOSE 5000

CMD ["gunicorn", "--workers", "4", "-b", ":5000", "api:app"]