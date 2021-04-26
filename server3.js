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
