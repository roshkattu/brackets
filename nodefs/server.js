/**
 * Node File System API Server
 * ---------------------------
 * Uses Socket.IO to make calls to different commands
 * on the host system that are required by Brackets
 */

var fs = require('fs'),
    app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

    /**
     * Constants
     */

    var _SERVER_PORT = 3000,
        Errors = {
            EmptyPath: "Empty path provided"
        };

    /**
     * Variables
     */

    var _connections = []; //Keep track of nodejs connections
    var _socket = null; //Keep a copy of the current socket



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





    /** ----------------------- FS COMMANDS  ----------------------- */

    /**
     * exists(path, callback)
     */
    function exists(path, callback){
        //Check if path is undefined
        if(undefined === path){
            //Return false because the path is not set
            callback(null, false);
        } else {
            //Check if the file exists
            fs.open(path, 'r', function(err, fd){
                if(null === err){
                    //File can be oppened -> exists
                    callback(null, true);
                } else {
                    //File cannot be oppened -> doesn't exist
                    callback(null, false);
                }
            });
        }
    };

    /**
     * stat(path,callback)
     * Return stats of a file
     */
    function stat(path, callback){
        if(undefined === path){
            //Return false because the path is not set
            callback(Errors.EmptyPath);
        } else {
            //Get file stats
            fs.stat(path, function(err, stats){
                if(err === null){
                    //Return file stats
                    callback(stats);
                } else {
                    //Return error
                    callback(err);
                }
            });
        }
    }

    /**
     * readdir(path, callback)
     */
    function readdir(path,callback){
        //Check if path is undefined
        if(undefined === path){
            //Return false because the path is not set
            callback(Errors.EmptyPath);
        } else {
            //Read the directory and return the files details
            fs.readdir(path, function(err,files){
                if(null === err){
                    //Recurse the file and return file name + file stats
                    var _files = [];
                    var _file_stats = [];
                    var _length = files.length;
                    //Iterate files
                    files.forEach(function(file, pos){
                        /**
                         * Append the current path to the file. Since we're only using this on linux the DIRECTORY_SEPARATOR
                         * will always be "/"
                         */
                        file = path + '/' + file;
                        var _stats = fs.statSync(file);
                        //Push the stats within the return object
                        _files.push(file);
                        _file_stats.push(_stats);
                    });
                    callback(null, _files, _file_stats);
                } else {
                    //Return the error of reading the directory
                    callback(err); // Is this ok?
                }
            });
        }
    };

    /**
     * mkdir(path, mode, callback)
     */
    function mkdir(path, mode, callback){
        //Check if path is undefined
        if(undefined === path){
            //Return false because the path is not set
            callback(Errors.EmptyPath);
        } else {
            //Check typeof mode to see if the mode has been provided or not
            if (typeof mode === "function") {
                callback = mode;
                mode = parseInt("0755", 8);
            }
            //Create the directory
            fs.mkdir(path, mode, function(err){
               if(null === err){
                   //Get file stats
                    fs.stat(path, function(err, stats){
                        if(err === null){
                            //Return file stats
                            callback(stats);
                        } else {
                            //Return error
                            callback(err);
                        }
                    });
               } else {
                   callback(err);//Return the error
               }
            });
        }
    };

    /**
     * readFile(path, options, callback)
     */
    function readfile(path, options, callback){
        //Check if path is undefined
        if(undefined === path){
            //Return false because the path is not set
            callback(Errors.EmptyPath);
        } else {
            //Read the file and get the data
            fs.readFile(path, function(err, data){
                if(null === err){
                    //Return data
                    callback(data);
                } else {
                    //Return error
                    callback(err);
                }
            });
        }
    }

    /**
     * rename(oldPath, newPath, callback)
     */
    function rename(oldPath, newPath, callback){
        fs.rename(oldPath, newPath, function(exc){
            if(null === exc){
                //Console log
                console.log("File moved; ["+oldPath+"] to ["+newPath+"]");
            } else {
                //Return exception
                callback(exc);
            }
        });
    }

    /**
     * writeFile(path, data, [options], callback)
     */
    function writefile(path, data, options, callback){
        if("function" === tyoeof options){
            callback = options; //Get the callback function if the options parameter isn't set
        }
        fs.writeFile(path, data, options, function(err){
             if(null === err){
                 //Return file stats
                 fs.stat(path, function(serr, stats){
                    if(serr === null){
                        //Return file stats
                        callback(stats);
                    } else {
                        //Return error
                        callback(serr);
                    }
                });
             } else {
                 //Return error
                 callback(err);
             }
        });
    }

    /**
     * unlink(path, callback)
     */
    function unlink(path, callback){
        fs.unlink(path, function(err){
            if(null === err){
                //Console log
                console.log("File has been removed ["+path+"]");
            } else {
                //Return error
                callback(err);
            }
        });
    }

    /** ----------------------- FS COMMANDS END -------------------- */




    /**
     * Start the server on our defined _EXPRESS_PORT
     *
     * @param _SERVER_PORT {Integer}
     * Server port
     */
    http.listen(_SERVER_PORT, function(){
        console.log("Your NodeFS Server is running on port "+ _SERVER_PORT);
    });
