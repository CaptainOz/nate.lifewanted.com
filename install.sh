#!/bin/bash

# If Mongo has not been added to the sources list, add it now.
MONGO_PACKAGE="deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen"
SOURCE_PATH="/etc/apt/sources.list"
if [ "`grep '$MONGO_PACKAGE' $SOURCE_PATH`" == "" ]; then
    echo "$MONGO_PACKAGE" | sudo tee --append "$SOURCE_PATH"
    sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
    sudo apt-get update
fi

# Now install Node.js and MongoDB
sudo apt-get install nodejs mongodb-10gen

# Once that's done install the Node.js modules we need.
npm install connect connect-gzip mongodb
