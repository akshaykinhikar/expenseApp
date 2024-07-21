# Use the official Node.js image
FROM node:14

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./
RUN npm install

# Add application code
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Command to run your app using nodemon
CMD ["npm", "start"]
