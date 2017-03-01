#!/bin/bash
#
# Run: source run.sh
#
DOCKER_APP_NAME=pi-barcode-scanner

if [ -f "container.pid" ]; then
   docker rm -f $DOCKER_APP_NAME
   rm container.pid
fi

docker run \
   -it \
   --privileged \
   --cidfile="container.pid" \
   --name $DOCKER_APP_NAME \
   -h $DOCKER_APP_NAME \
   -p :80 \
   -v $(pwd):/app \
   --add-host dockerhost:$(localip | head -n 1) \
   --env-file .docker-env \
   $DOCKER_APP_NAME "$@"
