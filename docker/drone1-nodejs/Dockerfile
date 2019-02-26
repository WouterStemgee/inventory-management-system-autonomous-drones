# Base image for x64/x86
FROM node:boron					

# Create app directory
RUN mkdir -p /usr/src/app

# Directory containing package.json file
COPY src/ /usr/src/app/ 
WORKDIR /usr/src/app

# Install dependencies
# COPY stats/package.json  /usr/src/app/
RUN npm install

# Expose HTTP port
EXPOSE 3000

# Start app through npm
CMD ["npm","start"]
