iTunes Utils
============

Various utilities for interfacing with iTunes libraries

Example
-------

``` js
var itunesUtils = require('itunes-utils');

// parse the iTunes library XML file
var itunes = new itunesUtils.iTunesLibrary();

// return all filenames of checked songs in iTunes
var files = itunes.musicFiles({
    checked: true
});

// print them separated by newline characters
console.log(files.join('\n'));
```

yields

```
4Minute/For Muzik/01 For Muzik.mp3
4Minute/For Muzik/02 Muzik.mp3
4Minute/For Muzik/03 Hot Issue.mp3
...
```

Usage
-----

### `var i = new iTunesLibrary([opts])`

Create an `iTunesLibrary` object - this parses the Library XML file
and can perform some simple functions on the parsed data

Arguments

- `opts.libraryFile`: defaults to `~/Music/iTunes/iTunes Music Library.xml`

When this object is returned, the following properties are available

- `.iTunesLibraryFile`: the argument given or the default path as a string
- `.iTunesLibraryData`: the parsed XML file
- `.iTunesMusicDir`: the directory where music is stored

### `i.musicFiles([opts])`

Return an array of music files in the library

Arguments

- `opts.checked`: only show "checked" files
- `opts.unchecked`: only show "unchecked" files
- `opts.absolutePath`: return absolute paths, default is relative to the music directory

CLI
---

A couple of utilities are include for CLI use

### `itunes-music-files`

List music files in the iTunes library

```
$ itunes-music-files -rc | tail -5
티파니 (Tiffany)/I Just Wanna Dance - The 1st Mini Album/1-02 TALK.mp3
티파니 (Tiffany)/I Just Wanna Dance - The 1st Mini Album/1-03 FOOL.mp3
티파니 (Tiffany)/I Just Wanna Dance - The 1st Mini Album/1-04 What Do I Do.mp3
티파니 (Tiffany)/I Just Wanna Dance - The 1st Mini Album/1-05 Yellow Light.mp3
티파니 (Tiffany)/I Just Wanna Dance - The 1st Mini Album/1-06 Once in a Lifetime.mp3
```

Usage

```
Usage: itunes-music-files [-l library.xml] [opts]

Print iTunes music filenames

Options
  -0, --nul              separate filenames by nulbyte (default is newline)
  -c, --checked          only show files checked in iTunes
  -h, --help             print this message and exit
  -l, --library <file>   iTunes Library XML file to use, otherwise default location
  -r, --relative         print filenames relative to music library, defaults to false
  -u, --unchecked        only show files unchecked in iTunes
  -U, --updates          check for available updates on npm
  -v, --version          print version number and exit
```

### `itunes-extraneous`

Show files that are in the music directory, that are not accounted for in the
library file.

Given

```
$ pwd
/Users/dave/Music/iTunes/iTunes Media/Music
$ touch bad-file
$ mkdir wrong
$ touch wrong/oops
```

You can find these files with

```
$ itunes-extraneous -r
bad-file
wrong/oops
```

Or no arguments for absolute paths

```
$ itunes-extraneous
/Users/dave/Music/iTunes/iTunes Media/Music/bad-file
/Users/dave/Music/iTunes/iTunes Media/Music/wrong/oops
```

Usage

```
$ itunes-extraneous -h
Usage: itunes-extraneous [-l library.xml]

Find files in an iTunes directory not in the library

Options
  -0, --nul              separate filenames by nulbyte (default is newline)
  -h, --help             print this message and exit
  -l, --library <file>   iTunes Library XML file to use, otherwise default location
  -r, --relative         print filenames relative to music library, defaults to false
  -U, --updates          check for available updates on npm
  -v, --version          print version number and exit
```

Installation
------------

Module

    npm install itunes-utils

CLI tools

    npm install -g itunes-utils

License
-------

MIT License
