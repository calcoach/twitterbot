const translate = require('google-translate-open-api').default;

async function translate_to(translate){

  try {
    const result = await translate(`I'm fine.`, {
      tld: "cn",
      to: "es"
    });
    const data = result.data[0];
    console.log(data);

  } catch (error) {

   console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
}

}

translate_to(translate);

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
await page.keyboard.type(reply).catch(e => {
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
.then(() => console.log("clicked it tweetButton"))
.catch(e => {
  console.log("Error: " + e);
});
await page.waitFor(2000).catch(e => {
console.log("Error: " + e);
});
