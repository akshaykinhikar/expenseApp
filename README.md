# REACT & NodeJS Application to add and split expenses among different members 

<a href="https://expense-app-i2th.onrender.com"> Live Application </a> - Note: Due to Free-host provider delay, application will take 3-4min detay for initial loading  

This MERN Application is  used to add user expenses manually for a trip/Group based. You can add add new expenses, edit(WIP), delete expenses, create group and members. 
Also able to view split expenses (shares) individual to contribute. 

## Getting Started

To get started with this project, follow the steps below:

### Prerequisites

- Node.js (version 12 or higher)
- npm (Node Package Manager)
- MongoDB

### Clone the Repository

1. Open your terminal.
2. Change the current working directory to the location where you want to clone the project.
3. Run the following command to clone the repository:


### Install Dependencies

1. Navigate to the project's root directory in the terminal.
2. Run the following command to install the required dependencies:

```js
npm install
```

### Build the Project

Before starting the project, it's recommended to build the application to ensure you have the latest changes. To build the project, run the following command:

```js
npm run build
```

### Start the Backend-end Project

To start and debug mongo services following command will be helpful:

```js
sudo systemctl start mongod
sudo systemctl daemon-reload
sudo systemctl status mongod
sudo systemctl enable mongod   // optionally ensure that MongoDB will start following a system reboot 
sudo systemctl stop mongod
sudo systemctl restart mongod // You can follow the state of the process for errors or important messages by watching the output in the /var/log/mongodb/mongod.log file.
mongosh

```

To start the nodeJS application run the following command in expenseApp directory:

```js
npm run server
```
This will start backend node server on PORT `5000` and you will get message 

```js
Server Running on development mode on port 5000
MongoDB Connected: 127.0.0.1
```

### Start the Front-end Project

To start the React application run the following command:

```js
cd expense-app && npm run start
```

This will launch the application on a local development server. Open your web browser and visit `http://localhost:3000` to see the application in action.

## References: 

### Upload Images with React & Node JS to AWS S3
https://www.youtube.com/watch?v=vVBqEYNXxy8&t=403s
