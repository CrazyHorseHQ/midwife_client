smart_client
==============

Setup
-----

* Install Node&NPM using a method of your choice, such as Homebrew ```brew install node```
* ```npm install -g yo```
* ```npm install -g grunt```

```cd smart_client && npm install && bower install```

Running this client
------------------

You will need an API key to authenticate the client against the API. See [here](http://www.theproduct.works/contact-us) for an API key or email someone you know within the organisation.

Add a file called ```.api_key``` with the contents being the key you set up in the DB on the API side, no spaces or newlines. The [Gruntfile](https://github.com/TheProductWorks/smart_client/blob/master/Gruntfile.js#L246) will read this file and embed it into the compiled Javascript.

Now run ```grunt serve```

Running another client
---------------------

If you're a developer of an app that will consume the API then you will still need an API key, which you can request from [here](http://www.theproduct.works/contact-us) or email someone you know within the organisation. This API key should be configured in your client and submitted as part of every request. See below for API doc location.

API Documentation
=================

is [here](https://github.com/TheProductWorks/smart_client/blob/master/doc/api.md). If you see anything inconsistent then issue a PR and we can merge it.

Testing
=======

Install all the dependencies for Testing

```bash
$ npm install -g testem
```
