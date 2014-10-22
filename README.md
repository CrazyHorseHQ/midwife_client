smart_client
==============

Setup
-----

* Install Node&NPM using a method of your choice, such as Homebrew ```brew install node```
* ```npm install -g yo```
* ```npm install -g grunt```

```cd smart_client && npm install && bower install```

Running the client
------------------

You will need to set up an API key to authenticate the client against the API. For details on placing the API key in the DB see the [smart_app](https://github.com/TheProductWorks/smart_app) README. See [here](http://www.theproduct.works/contact-us) for read access to the API.

Add a file called ```.api_key``` with the contents being the key you set up in the DB on the API side, no spaces or newlines. The [Gruntfile](https://github.com/TheProductWorks/smart_client/blob/master/Gruntfile.js#L246) will read this file and embed it into the compiled Javascript.

Now run ```grunt serve```
