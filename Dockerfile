FROM resin/raspberrypi2-python:wheezy

MAINTAINER "Jose Pacheco" <jpacheco@csatf.org>

# Enable systemd
ENV INITSYSTEM on
ENV NODE_VERSION 5.7.1
ENV CXX=g++-4.8

# replace this with your application's default port
EXPOSE 80

# Install Node
RUN curl -SLO "http://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-armv7l.tar.gz" \
	&& echo "2370e6ad65dedc1eadcc1b3a481e922a8b5afacee9e90eb6700fee876eb59a5b  node-v5.7.1-linux-armv7l.tar.gz" | sha256sum -c - \
	&& tar -xzf "node-v$NODE_VERSION-linux-armv7l.tar.gz" -C /usr/local --strip-components=1 \
	&& rm "node-v$NODE_VERSION-linux-armv7l.tar.gz" \
	&& npm config set unsafe-perm true -g --unsafe-perm \
	&& npm install -g yarn \
	&& npm install -g nodemon \
	&& npm install -g node-gyp \
	&& npm install -g node-pre-gyp \
	&& rm -rf /tmp/*

# Install system packages
RUN apt-get update \
    && apt-get upgrade \
    && apt-get install vim git supervisor

# app dependencies
RUN apt-get install python-setuptools build-essential gcc-4.8 g++-4.8 libudev-dev libusb-1.0-0 libusb-1.0-0-dev \
    && easy_install pip

RUN mkdir -p /app
WORKDIR /app

CMD ["python install.py"]