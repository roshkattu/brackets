/*
 * Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 */

/**
 * =============================================================================
 * About ServerFileSystem.js
 * -------------------------
 * This ServerFileSystem impl will allow a user to take file actions on an apache
 * server for the /var/www folder.
 */


/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, appshell, $, window */

define(function (require, exports, module) {
    "use strict";

    var FileUtils           = require("file/FileUtils"),
        FileSystemStats     = require("filesystem/FileSystemStats"),
        FileSystemError     = require("filesystem/FileSystemError");

    /**
     * Connect to the socket server
     */


    /** ===========================
     * FileSystem interface methods
     */

    /**
     * @param {boolean} allowMultipleSelection
     * @param {boolean} chooseDirectories
     * @param {string} title
     * @param {string} initialPath
     * @param {Array.<string>=} fileTypes
     * @param {function(?string, Array.<string>=)} callback
     *
     * Display an open-files dialog to the user and call back asynchronously with either an error string or an array of path strings, which indicate the file or files chosen by the user.
     */
    function showOpenDialog(allowMultipleSelection, chooseDirectories, title, initialPath, fileTypes, callback){
        //TODO
        throw new Error();
    }

    /**
     * @param {string} title
     * @param {string} initialPath
     * @param {string} proposedNewFilename
     * @param {function(?string, string=)} callback
     *
     * Display a save-file dialog to the user and call back asynchronously with either an error or the path to which the user has chosen to save the file.
     */
    function showSaveDialog(title, initialPath, proposedNewFilename, callback){
        //TODO
        throw new Error();
    }

    /**
     * @param {string} path
     * @param {function(?string, boolean)} callback
     *
     * Determine whether a file or directory exists at the given path by calling back asynchronously with either an error or a boolean, which is true if the file exists and false otherwise. The error will never be FileSystemError.NOT_FOUND; in that case, there will be no error and the boolean parameter will be false.
     */
    function exists(path, callback){
        //TODO
        return true;
    }

    /**
     * @param {string} path
     * @param {function(?string, Array.<FileSystemEntry>=, Array.<?string|FileSystemStats>=)} callback
     *
     * Read the contents of the directory at the given path, calling back asynchronously either with an error or an array of FileSystemEntry objects along with another consistent array, each index of which either contains a FileSystemStats object for the corresponding FileSystemEntry object in the second parameter or a FileSystemErrors string describing a stat error.
     */
    function readdir(path, callback){
        //TODO
        callback();
    }

    /**
     * @param {string} path
     * @param {number=} mode
     * @param {function(?string, FileSystemStats=)=} callback
     *
     * Create a directory at the given path, and optionally call back asynchronously with either an error or a stats object for the newly created directory. The octal mode parameter is optional; if unspecified, the mode of the created directory is implementation dependent.
     */
    function mkdir(path, mode, callback){
        //TODO
        callback();
    }

    /**
     * @param {string} oldPath
     * @param {string} newPath
     * @param {function(?string)=} callback
     *
     * Rename the file or directory at oldPath to newPath, and optionally call back asynchronously with a possibly null error.
     */
    function rename(oldPath, newPath, callback){
        //TODO
        callback();
    }

    /**
     * @param {string} path
     * @param {function(?string, FileSystemStats=)} callback
     *
     * Stat the file or directory at the given path, calling back asynchronously with either an error or the entry's associated FileSystemStats object.
     */
    function stat(path, callback){
        //TODO
        callback();
    }

    /**
     * @param {string} path
     * @param {{encoding : string=}=} options
     * @param {function(?string, string=, FileSystemStats=)} callback
     *
     * Read the contents of the file at the given path, calling back asynchronously with either an error or the data and, optionally, the FileSystemStats object associated with the read file. The optional options parameter can be used to specify an encoding (default "utf8").
     */
    function readFile(path, options, callback){
        //TODO
        callback();
    }

    /**
     * @param {string} path
     * @param {string} data
     * @param {{encoding : string=, mode : number=}=} options
     * @param {function(?string, FileSystemStats=)} callback
     *
     * Write the given data to the file at the given path, calling back asynchronously with either an error or, optionally, the          * FileSystemStats object associated with the written file. The optional options parameter can be used to specify an encoding (default "utf8") and an octal mode (default unspecified and implementation dependent). If no file exists at the given path, a new file will be created.
     */
    function writeFile(path, data, options, callback){
        //TODO
        callback();
    }

    /**
     * @param {string} path
     * @param {function(string)=} callback
     *
     * Unlink the file or directory at the given path, optionally calling back asynchronously with a possibly null error.
     */
    function unlink(path, callback){
        //TODO
        callback();
    }

    /**
     * @param {function(?string, FileSystemStats=)} changeCallback
     * @param {function(?string)=} offlineCallback
     *
     * Initialize file watching for this filesystem. The implementation must use the supplied changeCallback to provide change notifications. The first parameter of changeCallback specifies the changed path (either a file or a directory); if this parameter is null, it indicates that the implementation cannot specify a particular changed path, and so the callers should consider all paths to have changed and to update their state accordingly. The second parameter to changeCallback is an optional FileSystemStats object that may be provided in case the changed path already exists and stats are readily available.
     *
     * If file watching becomes unavailable or is unsupported, the implementation must call offlineCallback if it was provided, optionally passing an error code. In addition, the implementation must ensure that all future calls to watchPath() fail with an error (until such time as file watching becomes available again).
     */
    function initWatchers(changeCallback, offlineCallback){
        //TODO
    }

    /**
     * @param {string} path
     * @param {function(?string)=} callback
     *
     * Start providing change notifications for the file or directory at the given path, optionally calling back asynchronously with a possibly null error when the operation is complete. Notifications are provided using the changeCallback function provided by the initWatchers method. If the path is a directory, the expected behavior depends on the implementation's recursiveWatch flag: if true, notifications are expected for the entire subtree rooted at this directory; if false, notifications are expected only for the directory's immediate children.
     */
    function watchPath(path, callback){
        //TODO
        callback();
    }

    /**
     * @param {string} path
     * @param {function(?string)=} callback
     *
     * Stop providing change notifications for the file or directory at the given path and all subfolders, optionally calling back asynchronously with a possibly null error when the operation is complete. Unlike watchPath(), this is always expected to behave recursively.
     */
    function unwatchPath(path, callback){
        //TODO
        callback();
    }

    /**
     * @param {function(?string)=} callback
     *
     * Stop providing change notifications for all previously watched files and directories, optionally calling back asynchronously with a possibly null error when the operation is complete.
     */
    function unwatchAll(callback){
        //TODO
        callback();
    }


     // Export public API
    exports.showOpenDialog  = showOpenDialog;
    exports.showSaveDialog  = showSaveDialog;
    exports.exists          = exists;
    exports.readdir         = readdir;
    exports.mkdir           = mkdir;
    exports.rename          = rename;
    exports.stat            = stat;
    exports.readFile        = readFile;
    exports.writeFile       = writeFile;
    exports.unlink          = unlink;
    //exports.moveToTrash     = moveToTrash;
    exports.initWatchers    = initWatchers;
    exports.watchPath       = watchPath;
    exports.unwatchPath     = unwatchPath;
    exports.unwatchAll      = unwatchAll;

    /**
     * Indicates whether or not recursive watching notifications are supported
     * by the watchPath call. Currently, only Darwin supports recursive watching.
     *
     * @type {boolean}
     */
    exports.recursiveWatch = false;

    /**
     * Indicates whether or not the filesystem should expect and normalize UNC
     * paths. If set, then //server/directory/ is a normalized path; otherwise the
     * filesystem will normalize it to /server/directory. Currently, UNC path
     * normalization only occurs on Windows.
     *
     * @type {boolean}
     */
    exports.normalizeUNCPaths = true;

});
