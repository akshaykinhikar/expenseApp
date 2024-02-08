# expenseApp

### start frontend Application

### start backend Application
projects/expenseApp/backend$ npm run server

# MongoDB services up on system 
sudo systemctl start mongod
sudo systemctl daemon-reload
sudo systemctl status mongod
sudo systemctl enable mongod   // optionally ensure that MongoDB will start following a system reboot 
sudo systemctl stop mongod
sudo systemctl restart mongod // You can follow the state of the process for errors or important messages by watching the output in the /var/log/mongodb/mongod.log file.
mongosh
