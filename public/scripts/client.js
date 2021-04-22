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

$(document).ready(() => {

const renderTweets = function(tweets) {
  for (let element of tweets) {
    let $tweet = createTweetElement(element);
    $('.maincontainer').prepend($tweet);
  }
}

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
  const loadTweets = () => {
    $.ajax("/tweets", { method: "GET", dataType: 'json' })
    .then((res) => {
      console.log("RESPONSING",res);
      renderTweets([res[res.length - 1]]);
      console.log("I MADE IT");
    });
  };
  
  renderTweets(data);
  
  $("#tweetform").on('submit', function(event) {
    event.preventDefault();
    let datastring = $("#tweetform").serialize();
    console.log("EVENT CALLING",event)
    $.ajax("/tweets", { method: "POST", data: datastring })
    .then(() => {
      loadTweets();
      console.log("I MADE IT");
    });
  });

});


