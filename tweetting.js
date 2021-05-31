const Twit = require('twit');
const config = require('./src/config')
const puppeteer =  require('puppeteer');
const jsdom = require('jsdom');

//console.log(process.env.TWITTER_CONSUMER_KEY);
T = new Twit(config.twitterKeys);

(async () => {

    try {

      const browser = await puppeteer.launch() ;
      const page = await browser.newPage();
      await page.goto('https://mobile.twitter.com/login');

      await page.waitFor(3000)
      .then(() => console.log("waited for 3000"))
      .catch(e => {
       console.log("Error: " + e);
       });


      // Login
       await page.type('input[name="session[username_or_email]"]', 'pelisfull3');
       await page.type('input[name="session[password]"', 'fkferrers10');
       await page.click('div[role=button]');

       var fs = require('fs');
       var tweets = new Array;

       fs.readFile('nuevo.txt', 'utf8', function(err, data) {
         if (err) {
           return console.log(err);
         }

         tweets = data.split('\n');
       });


       await page
         .waitForNavigation({ waitUntil: "domcontentloaded" })
         .then(() => {
           console.log("Waited for page navigation");
         })
         .catch(e => {
           console.log("Error: " + e);
         });
       await page
         .waitFor(4000)
         .then(() => {
           console.log("Waited for 3000");
         })
         .catch(e => {
           console.log("Error: " + e);
         });

         count = 0;

         for(tw in tweets){

           count = count + 1;

           // wait till page load
           await page
           .waitForSelector('[data-testid="SideNav_NewTweet_Button"]')
           .then(() => console.log("got it"))
           .catch(e => {
             console.log("Error: " + e);
           });

           //same thing
           //await page.click('.css-1dbjc4n.r-1awozwy.r-jw8lkh.r-e7q0ms')
           await page.click('[data-testid="SideNav_NewTweet_Button"]').catch(e => {
           console.log("Error: " + e);
           });

           // Typing Tweet
           await page
           .waitForSelector('[data-testid="tweetTextarea_0"]')
           .then(() => console.log("got it tweetTextarea_0"))
           .catch(e => {
             console.log("Error: " + e);
           });
           await page
           .click('[data-testid="tweetTextarea_0"]')
           .then(() => console.log("clicked it tweetTextarea_0"))
           .catch(e => {
             console.log("Error: " + e);
           });
           await page.keyboard.type(tweets[tw]).catch(e => {
           console.log("Error: " + e);
           });
           await page.waitFor(2000).catch(e => {
           console.log("Error: " + e);
           });

           //Clicking Tweet Button to post Tweet
           await page
           .waitForSelector('[data-testid="tweetButton"]')
           .then(() => console.log("got it tweetButton"))
           .catch(e => {
             console.log("Error: " + e);
           });
           await page
           .click('[data-testid="tweetButton"]')
           .then(() => console.log("Tweeted-> "+count))
           .catch(e => {
             console.log("Error: " + e);
           });
           await page.waitFor(getRandomArbitrary(45000,80000)).catch(e => {
           console.log("Error: " + e);
           });

         }



      //await page.waitForSelector('h1');
      //let h1 = await page.evaluate( () => document.querySelector('h1').innerText)

      //console.log(h1);

   // Cerramos el puppeteer
      await browser.close();
   } catch (error) {
     console.error(error);
   }
})();

function getRandomArbitrary(min, max) {
   return Math.floor(Math.random() * (max - min )) + min;
}
