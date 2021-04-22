/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
 
];

$(document).ready(() => {

  const renderTweets = function(tweets) {
    for (let element of tweets) {
      let $tweet = createTweetElement(element);
      $('.maincontainer').prepend($tweet);
    }
  };

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
  
  const validator = (str) => {
    if(str === null || str.length > 140 || str === '') {
      return null;
    } 
    return true;
  };


  $("#tweetform").on('submit', function(event) {
    event.preventDefault();
    if(validator($('#tweet-text').val())){
      let datastring = $("#tweetform").serialize();
      $.ajax("/tweets", { method: "POST", data: datastring })
      .then(() => {
        loadTweets();
        //empty the input line after submitting tweet.
        $('#tweet-text').val(''); 
      });
    }
  });

});


