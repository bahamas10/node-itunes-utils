/**
 * various utilities for interfacing with iTunes, and the iTunes
 * XML file
 *
 * Author: Dave Eddy <dave@daveeddy.com>
 * Date: January 27, 2017
 * License: MIT
 */

var assert = require('assert');
var fs = require('fs');
var path = require('path');
var util = require('util');

var plist = require('plist');

var f = util.format;

var DEFAULT_LIBRARY_FILE = path.join(
    process.env.HOME,
    'Music/iTunes/iTunes Music Library.xml');

function iTunesLibrary(opts) {
    var self = this;

    assert(self instanceof iTunesLibrary,
        'iTunesLibrary must be called with "new"');

    if (typeof opts === 'string')
        opts = {libraryFile: opts};
    opts = opts || {};

    self.iTunesLibraryFile = opts.libraryFile || DEFAULT_LIBRARY_FILE;

    var contents = fs.readFileSync(self.iTunesLibraryFile, 'utf8');
    self.iTunesLibraryData = plist.parse(contents);

    assert(self.iTunesLibraryData['Music Folder'],
        'Music Folder not found in iTunes data');

    self.iTunesMusicDir = path.join(
        decodeFile(self.iTunesLibraryData['Music Folder']),
        'Music');
}

iTunesLibrary.prototype.musicFiles = function musicFiles(opts) {
    var self = this;

    opts = opts || {};
    assert(!(opts.checked && opts.unchecked),
        'checked and unchecked cannot be specified together');

    var files = [];
    Object.keys(self.iTunesLibraryData.Tracks).forEach(function (key) {
        var track = self.iTunesLibraryData.Tracks[key];
        // only want audio files
        if (!track.Kind.match(/audio file$/))
            return;

        // we don't care if the file is remote (purchased, etc)
        if (!track.Location)
            return;

        // filter unchecked
        if (opts.checked && track.Disabled)
            return;

        // filter checked
        if (opts.unchecked && !track.Disabled)
            return;

        var clean = decodeFile(track.Location);
        var base = clean.substr(0, self.iTunesMusicDir.length);

        // filter voice memos and other non-songs
        if (base !== self.iTunesMusicDir)
            return;

        if (!opts.absolutePath)
            clean = clean.substr(self.iTunesMusicDir.length + 1);

        files.push(clean);
    });

    return files;
};

function decodeFile(fname) {
  var abs = fname.replace(/^file:\/\//, '');
  return decodeURIComponent(abs);
}

module.exports.iTunesLibrary = iTunesLibrary;
module.exports.decodeFile = decodeFile;
