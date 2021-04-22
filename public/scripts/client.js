/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {

  for (let element of tweets) {
    let $tweet = createTweetElement(element);
    $('.tweetcontainer').append($tweet);
  }
}

//grab existing tweets
// const loadTweets = (done) => {
//   $.ajax('tweets', { method: 'GET'})
//   .then(res => done(res))
// };

// //renders on page load
// loadTweets(renderTweets); 

const createTweetElement = function(obj) {

  const $tweet = $(` <div class="tweetcontainer">
      <header class='tweetcontheader'> 
        <div class="iconname">
          <i class="fas fa-user"></i>
          <h5 class="profilename">${obj['user'].name}</h5>
        </div>
        <h5 class="username"id='username'>${obj['user'].handle}</h5>  
      </header>
      <article> ${obj['content'].text}</article>
      <hr>
      <footer class="footer"> 
        <p id="pastdate"> <span class="need_to_be_rendered" datetime="2016-07-07T09:24:17Z">${'11 days ago'}</span></p>
        <div class="icons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-sync-alt"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </div>`);

    return $tweet;
  };

$(document).ready(function(){
  renderTweets(data)
});


const validator = (str) => {
  if(str === null || str.length > 140 || str === '') {
    return null;
  } 
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML();
};

  $("#tweetform").on('submit', function (event) {
    event.preventDefault();
    const validatedText = validator($('#tweet-text').val());
    console.log('Button clicked, performing ajax call...');
    $.ajax('/tweets/', { method: 'POST', data: validatedText })
    .then(function (moreTweets) {
      $('.tweetcontainer').empty();
      //loadTweets(renderTweets);
      $('.counter').val(140);
      $('#tweet-text').val('');
    });
  });




// $(".tweetform").on("submit", function (event) {
//   event.preventDefault();

//   $.ajax({
//     tweets: tweets,
//     method: "POST",
//   })
// });
