FROM haskell:9
RUN \
    apt-get update &&\
    apt-get install -y python3-pip git &&\
    git clone https://github.com/mmcilree/Demystify-Visualiser.git \
        /home/DemystifyVisualiser &&\
    git clone https://github.com/conjure-cp/conjure.git /conjure

ENV WORK /conjure
WORKDIR $WORK

# # Copied from the conjure docker image (https://github.com/conjure-cp/conjure/blob/master/etc/build/docker/Dockerfile)
# # - default Haskell stack build usually fails on Docker, instead
# # install a known-to-work binary build, see:
# # https://github.com/commercialhaskell/stack/issues/3510#issuecomment-386266579
# RUN apt-get install -y --no-install-recommends \
#      curl \
#  && curl -fSL https://github.com/commercialhaskell/stack/releases/download/v1.7.1/stack-1.7.1-linux-x86_64.tar.gz -o stack.tar.gz \
#  && curl -fSL https://github.com/commercialhaskell/stack/releases/download/v1.7.1/stack-1.7.1-linux-x86_64.tar.gz.asc -o stack.tar.gz.asc \
#  && apt-get purge -y --auto-remove curl \
#  && export GNUPGHOME=$WORK \
#  # The SKS Keyserver Network is being deprecated so changed to ubuntu (https://stackoverflow.com/questions/66217436/gpg-keyserver-receive-failed-no-name)
#  && gpg --keyserver keyserver.ubuntu.com --recv-keys C5705533DA4F78D8664B5DC0575159689BEFB442 \
#  && gpg --batch --verify stack.tar.gz.asc stack.tar.gz \
#  && tar -xf stack.tar.gz -C /usr/local/bin --strip-components=1 \
#  && /usr/local/bin/stack config set system-ghc --global true \
#  && /usr/local/bin/stack config set install-ghc --global false \
#  && rm -f stack.tar.gz.asc stack.tar.gz

RUN make &&\
    make install &&\
    etc/build/install-minion.sh

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