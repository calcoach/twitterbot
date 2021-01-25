const Twitter = require('twitter');
const config = require('./src/config')


console.log(process.env.TWITTER_CONSUMER_KEY);
client = new Twitter(config.twitterKeys);
