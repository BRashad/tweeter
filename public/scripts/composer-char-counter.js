$(document).ready(function() {

  // this code is for counting the number of characters input into tweeter input field

  $('#tweet-text').on("input", function(input) {

    const maxLength = 140;
    const inputLength = $(this).val().length;
    const charactersLeft = maxLength - inputLength;
    
    const $counter = $(this).parent().children('.tweetb').children('.counter'); 

    $counter.text(charactersLeft);

    // color swtich when character limit reached

    if(charactersLeft < 0) {
      $counter.css( "color", "red");
    } else {
      $counter.css( "color", "black");
    };
    
  });
  
}); 



