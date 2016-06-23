# Feed Fuse

View all your social feeds in one place!

## Team

  - __Product Owner__: Brett Celestre
  - __Scrum Master__: Brett Celestre
  - __Development Team Members__: Brett Celestre, Andrew Tsao

## Table of Contents

1. [Usage](#usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

<!-- ## Usage -->

## Requirements

- Express 4.13.4
- Angular

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

### Configuration File

Create: server/config/config.js

Create a new app on both Instagram and Twitter then place your id/key and secret into that file. This data is require on and used in server/routes/twitter.js and server/routes/instagram.js.

Below is the structure of that file. 

```javascript
module.exports = {
  twitterConfig: {
    key: '',
    secret: ''
  },
  instagramConfig: {
    id: '',
    secret: ''
  },
  facebookConfig: {
    key: '',
    secret: ''
  }
}; 
```

### Authorizing Instagram

YOU HAVE TO DO THIS BEFORE ANYTHING TO AUTH INSTAGRAM PUBLIC CONTENT REQUESTS

After creating your Instagram App and formatting your config.js file you have to go to this URL for your app to properly authenticate.
Don't forget to place in your client_id

```
https://www.instagram.com/oauth/authorize/?client_id=YOUR_INSTAGRAM_ID&redirect_uri=http://127.0.0.1:5000/auth/instagram/callback&response_type=code&scope=public_content
```
  
The Instagram API will only search hashtags of IG accounts you have added to our IG development account. You can only add 10 accounts which is very limiting. Read the docs for more info. Your app will be in sandbox mode.
https://www.instagram.com/developer/sandbox/


### Node Modules Used

**node-twitter-api**
[https://www.npmjs.com/package/node-twitter-api](https://www.npmjs.com/package/node-twitter-api)

**instagram-node**
[https://www.npmjs.com/package/instagram-node](https://www.npmjs.com/package/instagram-node)


### Roadmap

View the project roadmap [here](https://github.com/woebegonegraybeards/woebegonegraybeards/issues)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
