/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  $("#arrow").on('click', function() {
    $(".new-tweet").fadeToggle(1000);
  });

  // tweet rendering
  const renderTweets = function(tweets) {
    for (let element of tweets) {
      let $tweet = createTweetElement(element);
      $('.maincontainer').prepend($tweet);
    }
  };
  
  // tweets html snippet rendering for each new tweet
  const createTweetElement = function(obj) {

    const $tweet = $(` <div class="tweetcontainer">
      <header class='tweetcontheader'> 
        <div class="iconname">
          <i class="fas fa-user"></i>
          <h5 class="profilename">${obj['user'].name}</h5>
        </div>
        <h5 class="username"id='username'>${obj['user'].handle}</h5>  
      </header>
      <article> ${escape(obj['content'].text)}</article>
      <hr>
      <footer class="footer"> 
        <p id="pastdate"> <span class="need_to_be_rendered" datetime="2016-07-07T09:24:17Z">${timeago.format(new Date(obj['created_at']))}</span></p> 
        <div class="icons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-sync-alt"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </div>`);

    return $tweet;
  };

  // tweets loading in general and upon refresh
  const loadTweets = () => {
    $.ajax("/tweets", { method: "GET", dataType: 'json' })
      .then((res) => {
        renderTweets(res);
      });
  };
  
  loadTweets();
  
  // validation of use cases such as null, no entry and more characters than allowed
  // error messages upon meeting validation criteria
  const validator = (str) => {
    if (str === null || str === '') {
      $('.errormessageemptyfield').fadeIn(1000);
      return null;
    } else {
      $('.errormessageemptyfield').fadeOut();
    }

    if (str.length > 140) {
      $('.errormessage').fadeIn(1000);
      return;
    } else {
      $('.errormessage').fadeOut();
    }
    return true;
  };
  // timeago code snippet for reflecting time past since tweet
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // POST request with the following conditions:
  // if input passed through the validation, empty th input field after tweet, character counter and load tweets
  $("#tweetform").on('submit', function(event) {
    event.preventDefault();
    let str = $('#tweet-text').val();
    if (validator(str)) {
      let datastring = $("#tweetform").serialize();
      $.ajax("/tweets", { method: "POST", data: datastring })
        .then(() => {
          $('.maincontainer').empty();
          loadTweets();
          //empty the input line after submitting tweet.
          $('#tweet-text').val('');
          $('.counter').text(140);
        });
    }
  });
});


