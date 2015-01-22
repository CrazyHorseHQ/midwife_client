#smart_client

## Get set-up

####Pre-requisites: Node.js and NPM

* Install Node & NPM if you don't already have on your local machine. There are multiple methods to do this.

  - For example, on Apple OS X you can use Homebrew:

  ```bash
    brew install node
    npm install -g yo
    npm install -g grunt
  ```
  - For other OS, check out the available on [nodejs.org](http://nodejs.org/download/)
  
  Then install:
  
   ```cd smart_client && npm install && bower install```

## Running this client

#### Step 1

Firstly, to connect to the API, you will need:

1. An active __username__ and __password__ for the SMART system in order to generate valid auth_tokens for API calls.
2. A valid __API key__ so that the API knows you're an approved client when you make requests to it. 

To request these details for the test sandpit, email the [The Product Works](http://www.theproduct.works/contact-us) with your details and why you neede access to the API.

#### Step 2
Once you have a valid API key, add a file called ```.api_key``` containing the key. Ensure there are no spaces or newlines in the file. 
The [Gruntfile](https://github.com/TheProductWorks/smart_client/blob/master/Gruntfile.js#L246) will read this file and embed it into the compiled Javascript.

Now run:

  ```grunt serve```

## Running another client

If you're a developer of a client app besides this one, your app must have a valid, active API in order to communicate with the SMART API.
To request these details for the test sandpit, email the [The Product Works](http://www.theproduct.works/contact-us) with your details and why you neede access to the API. 
The API key must then be configured in your client and submitted as part of every request (as detailed in the API documentation).

## API Documentation

Information about the API and the calls it supports are described on the [API Description section] (https://github.com/TheProductWorks/smart_client/blob/master/doc/api.md). 

** IMPORTANT ** 
If you see anything in the API documenation that is not clear or plain inconsistent or confusing inconsistent then submit a GitHub issue, explaing the problem. We'll then review it and make the necessary changes.

## Testing

Install all the dependencies for Testing

  ```bash
  $ npm install -g testem
  ```
