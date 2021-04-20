$(document).ready(function() {
  // --- our code goes here ---

  let text = document.getElementById("tweet-text")

  text.addEventListener("input", function(input) {

    const maxLength = 140;
    let inputLength = $(this).val().length;
    
    let charactersLeft = maxLength - inputLength
    
    console.log(charactersLeft);

  });
  

});



