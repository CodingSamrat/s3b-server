#!/bin/bash

# Clone the repository
git clone https://github.com/CodingSamrat/s3b-server.git
cd s3b-server

# Install npm packages globally and locally
sudo npm install -g .
npm install
sudo npm install -g pm2

# Create /volume directory and set permissions
sudo mkdir /volume
sudo chown -R $(whoami):$(whoami) /volume