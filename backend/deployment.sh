#!/bin/bash

docker stop stream2gether
docker rm stream2gether
docker build . --tag=stream2gether
docker run -d -p 8081:8080 --restart unless-stopped --name stream2gether stream2gether