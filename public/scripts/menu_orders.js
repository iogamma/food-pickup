$(document).ready(function(){
  // Send AJAX call to server to update item's quantity
  $('.qty_input').on('blur', function(event) {
    event.preventDefault();
    //Find the item's ID
    var itemId = $(this).closest(".items_id").data("item_id");

    //TODO: Ajax POST to server for that item with the input value
    $.ajax({
       method: 'POST',
       url: '/cart/itemId'
    }).then( funcation() {

    }).fail( function() {

    });
  });

  $('.plus_item').on('click', function(event) {
    event.preventDefault();
    //TODO: AJAX POST to server to increment quantity for that item.

  });

  $('.minus_item').on('click', function(event) {
    event.preventDefault();
    //TODO: AJAX POST to server to decrement quantity for that item.
  });
});