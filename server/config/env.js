
// server/config/config.js


// Local Dev 
// module.exports = {

//   // Twitter Key and Secret
//   twitterConfig: {
//     key: require('./config.js').twitterConfig.key,
//     secret: require('./config.js').twitterConfig.secret
//   },

//   // Instagram Key and Secret
//   instagramConfig: {
//     id: require('./config.js').instagramConfig.id,
//     secret: require('./config.js').instagramConfig.secret
//   },
 
//   // Facebook Key and Secret [ BACKLOG ]
//   facebookConfig: {
//     key: '',
//     secret: ''
//   }

// }; 


// Production Keys
module.exports = {

  // Twitter Key and Secret
  twitterConfig: {
    key: process.env.twitterKey,
    secret: process.env.twitterSecret
  },

  // Instagram Key and Secret
  instagramConfig: {
    id: process.env.instgramConfigID,
    secret: process.env.instgramConfigSecret
  },
 
  // Facebook Key and Secret [ BACKLOG ]
  facebookConfig: {
    key: '',
    secret: ''
  }

}; 