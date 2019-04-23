# Base image for x64/x86
FROM node:boron				

#PM2 will be used as PID 1 process
RUN npm install -g pm2	

# Create app directory
RUN mkdir -p /usr/src/backend
RUN mkdir -p /usr/src/mockup

# Directory containing package.json file
COPY src/backend /usr/src/backend/ 
COPY src/mockup /usr/src/mockup/ 
COPY src/process.json /usr/src/process.json
WORKDIR /usr/src/

# Install dependencies
RUN cd ./backend \
    && npm i \
    && cd ../mockup \
    && npm i

# Expose HTTP port
EXPOSE 3000
EXPOSE 3001

# Start PM2 as PID 1 process
ENTRYPOINT ["pm2", "--no-daemon", "start"]

# Actual script to start can be overridden from `docker run`
CMD ["process.json"]