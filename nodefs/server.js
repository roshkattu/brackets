/**
 * Node File System API Server
 * ---------------------------
 * Uses Socket.IO to make calls to different commands
 * on the host system that are required by Brackets
 */

var fs = require('fs'),
    app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    Commands = require("./commands.js");

    /**
     * Constants
     */

    var _SERVER_PORT = 3000;

    /**
     * Variables
     */

    var _connections = []; //Keep track of nodejs connections
    var _socket = null; //Keep a copy of the current socket
    var _cmd = new Commands(fs); //Create instance of the Commands() class

    /**
     * Socket server logic
     */
    io.on('connection', function(socket){

        /**
         * Push our socket connection within the _connections array
         */
        _connections.push(socket);
        _socket = socket;

        //Show message that our socket has been added to the connections pool
        console.log("A new connection has been established with: "+socket.id);
    });


    /**
     * Start the server on our defined _EXPRESS_PORT
     *
     * @param _SERVER_PORT {Integer}
     * Server port
     */
    http.listen(_SERVER_PORT, function(){
       console.log("Your NodeFS Server is running on port "+ _SERVER_PORT);
    });
