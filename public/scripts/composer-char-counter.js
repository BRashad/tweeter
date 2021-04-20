$(document).ready(function() {
  // --- our code goes here ---

  $('#tweet-text').on("input", function(input) {

    const maxLength = 140;
    let inputLength = $(this).val().length;
    let charactersLeft = maxLength - inputLength
    
    let counter = $(this).parent().children('.tweetb').children('.counter');

    counter.text(charactersLeft)

    if(charactersLeft < 0) {
      counter.css( "color", "red");
    } else {
      counter.css( "color", "black");
    };

    //console.log();
    //console.log(counter.text()); //grab the text/value
    //$(this).closest('someSelector').find('.counter')
  });
  
});



