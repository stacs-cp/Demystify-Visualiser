#!/bin/bash
# NOTE : Quote it else use array to avoid problems #
FILES="./*"
for f in $FILES
do
  mkdir "${f%.*}"_params
done
