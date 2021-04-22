$(document).ready(function() { 

  const date = new Date();

  let timeago = timeago.format(date);
  
  
  timeago.render(document.querySelectorAll('.need_to_be_rendered'));
  

});

