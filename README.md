# Api for NetAtmo

This is a simple initial version of a node.js API to query the [NetAtmo REST API][1].

## Install

Very soon you'll be able to install it with NPM like this.

```bash
npm install netatmo
```

## Usage

```js
var NetAtmo = require( "netatmo" );
var netatmo = new NetAtmo( "username", "password" );
netatmo.user( function( user ) {
  console.dir( user );
});
```

## Instance methods

* `user`: takes a callback that gets a single argument back that is the user object gotten from the [NetAtmo API][1].
* `devices`: takes a callback that gets a single argument that is an array with objects describing the devices.

Getting real information is still a work in progress.


  [1]: http://dev.netatmo.com/