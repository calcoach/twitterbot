const Twit = require('twit');
const config = require('./src/config')

//console.log(process.env.TWITTER_CONSUMER_KEY);
T = new Twit(config.twitterKeys);

function post(content){

  T.post('statuses/update', {status: content}, function(err, data, response) {

    console.log(data);
});

}

function retweet() {
   let params={
     q:'#OnePlusMirrorBlue',
     count:10
   }
   T.get('search/tweets',params,(err,data,response)=>{
     let tweets=data.statuses

     if (!err) {
       for(let dat of tweets) {
         let retweetId = dat.id_str;
         T.post('statuses/retweet/:id', {id: retweetId},(err, response)=> {
           if (response)
             console.log('Retweeted!!! '+ retweetId)
           if (err)
            console.log('Something went wrong while RETWEETING... Duplication maybe...')})
       }
     }
    })
}

//post("Mi primer Tweet")
//var stream = T.stream('statuses/sample')
//stream.on('tweet', function (tweet) {
  //console.log(tweet)
//})
//setInterval(retweet,10000)
var stream = T.stream('statuses/filter', { track: 'uribe' })
var cont = 0;
var data = new Array;



stream.on('tweet', function (tweet) {
  // Quién envió el Tweet?
  var user = tweet.user.screen_name;
  // Si queremos ver el texto del tweet
  var name = tweet.user.name;
  var txt = tweet.text;
  // Obtenemos el tweet id
  var nameID = tweet.id_str;

   //Mensaje
   var reply = "@" + user + " " + name  + " "+ Mensaje(getRandomArbitrary(0, 10).toString());

   //data.push(reply);


   //T.post('statuses/update', {status: reply}, function (err, data, response) {
    //   if (err !== undefined) {
      //     console.log(err);
       //} else {
        //   console.log('Tweeted: ' + params.status);
       //}
  // })
 //}


//Nombre del twitero y link del twwet.

  var text = name + " https://twitter.com/" + user + "/status/" + nameID+"  texto- >"+ txt;
  data.push(text);
  console.log(text)

})

setTimeout(function(){
  var fs = require('fs');

  var stream = fs.createWriteStream("nuevo.txt");
  stream.once('open', function(fd) {
    data.forEach(function(elemento, indice, array) {

     stream.write(elemento+"\n");

    })
  stream.end();
});

}, 1000000)

function Mensaje(numero){

 let mensaje = ["Quieres disfrutar de peliculas de estreno y de Netflix gratis? -> https://t.me/pelisfull3 ",
"Hola, disfruta de tus peliculas favoritas en este canal de telegram: https://t.me/pelisfull3",
"Hola, hola, que tal !!!! Difruta aqui peliculas gratis en telegram: https://t.me/pelisfull3",
"Pasaba por aqui, para recomendarte este canal de peliculas de telegram: https://t.me/pelisfull3",
"Hey socio, aqui puedes disfrutar de este canal de telegram con peliculas de estreno: https://t.me/pelisfull3",
"Sabes que en telegram puedes ver peliculas, no te pierdas los ultimos estrenos aqui: https://t.me/pelisfull3",
"Quieres disfrutar de tus peliculas favoritas sin publicidad, solo aqui: https://t.me/pelisfull3",
"A veces llegamos cansados del trabajo, y queremos divertirnos con una peliculas, pero no tenemos Netflix. Bueno aqui la solucion peliculas gratis: https://t.me/pelisfull3",
"Quieres disfrutar de peliculas sin pagar sigue este canal de telegram: https://t.me/pelisfull3",
"Cansado no tener que pagar Netflix, disfruta aqui sin pagar: https://t.me/pelisfull3",
"Difruta aqui de los ultimos estrenos del cine sin costo: https://t.me/pelisfull3"]
  return mensaje[numero];
}

//Mencion

//var stream = T.stream('statuses/filter', { track: '@PelisFull3' });
// Ahora estamos observando todos los eventos relacionados al stream y en caso que pase algo ejecutamos la función tweetEvent que creamos nosotros

//stream.on('tweet', tweetEvent);
//Función tweetEvent
function tweetEvent(tweet) {
    // Quién envió el Tweet?
    var name = tweet.user.screen_name;
    // Si queremos ver el texto del tweet
    var txt = tweet.text;
    // Obtenemos el tweet id
    var nameID = tweet.id_str;
    // Si queremos eliminar la mención
    var txt = txt.replace(/@myTwitterHandle/g, "");
    //Obtenemos un valor Random para buscar en el array
    var random = getRandomArbitrary(0, arrayWords.length);
    // Lo que hacemos es responder a ese tweet
    var reply = "@" + name + " " + " Hola, gracias por mencionarme";
    var params = {
        status: reply,
        in_reply_to_status_id: nameID
    };
    T.post('statuses/update', params, function (err, data, response) {
        if (err !== undefined) {
            console.log(err);
        } else {
            console.log('Tweeted: ' + params.status);
        }
    })
};
//Funcion para obtener valor Random
function getRandomArbitrary(min, max) {
   return Math.floor(Math.random() * (max - min )) + min;
}
