# Steps to build/serve this image
# A Dockerfile is a text document that contains all the commands/Instruction a user could call on the command line to assemble an image.
# Using docker build commmand we can build an image from a Dockerfile.

# Import base image
FROM node:14

# Make a new directory to store our files in
RUN mkdir /home/app/

# Copy files from HOST to container
COPY ./app /home/app/

# set default dir so that next commands executes in /home/app dir
WORKDIR /home/app

# will execute npm install in /home/app because of WORKDIR
RUN npm install

# Entry point command to start application
# Can be overriden by command line instruction e.g. docker run my-app node file.js
CMD [ "node", "/home/app/index.js" ]
