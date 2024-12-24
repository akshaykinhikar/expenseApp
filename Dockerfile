# Use the official Node.js image
FROM node:14

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json /usr/src/app/
RUN npm install\
    && npm install typescript -g

# Add application code
COPY . /usr/src/app

RUN tsc --build

# Expose the port your app runs on
EXPOSE 5000

# Command to run your app using nodemon
CMD ["npm", "start"]