# Steps to build/serve this image

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
CMD [ "node", "/home/app/index.js" ]
