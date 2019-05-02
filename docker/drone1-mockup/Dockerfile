# Base image for x64/x86
FROM node:boron				

# Create app directory
RUN mkdir -p /usr/src/mockup

# Directory containing package.json file
COPY src/ /usr/src/mockup/ 

WORKDIR /usr/src/mockup

# Install dependencies
RUN npm install

# Expose HTTP port
EXPOSE 3001

# Start app through npm
CMD ["npm", "start"]