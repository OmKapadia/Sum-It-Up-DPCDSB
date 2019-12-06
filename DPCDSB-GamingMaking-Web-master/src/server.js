const express = require('express')
const path = require('path');
const app = express()
const socket = require('socket.io')

//Main Server Variables
var PORT = process.env.PORT || 3000
const server = app.listen(PORT)
const io = socket(server)

//Variables
var coLimit = 2
var clientID = []

const publicDirectory = path.join(__dirname, '../public') //sets directory of where html files are
app.use(express.static(publicDirectory))
console.log('Server is up.')

io.on('connection', (socket) => { //Waits for a new connection
	if (io.engine.clientsCount > coLimit) { //checks if there are more then 2 client connections
		socket.emit('err', {message: 'reach the limit of connections'})
		socket.disconnect() //if more then 3 --> disconnects
		console.log('Disconnected')
		clientID = []; //Empty clientID array
	} else {
		if (io.engine.clientsCount == 2) {
			connectState = true;
		}
		console.log('New connection: ' + socket.id);
		clientID.push(socket.id) //Adds socket ID to clientID array
		console.log('Number of connections: ' + io.engine.clientsCount);
		socket.broadcast.emit('newConnection', connectState);
		if (clientID.length > coLimit) {
			plays = 0;
            clientID.shift();
        }

    }
})