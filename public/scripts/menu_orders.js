$(document).ready(function(){
  // Send AJAX call to server to update item's quantity
  $('.qty_input').on('blur', function(event) {
    event.preventDefault();
    //Find the item's ID
    var itemId = $(this).closest(".items_id").data("item_id");

    //TODO: Ajax POST to server for that item with the input value
    $.ajax({
      method: 'POST',
      url: '/cart/' + itemId
    }).then( function() {
      // Optional HTML confirmation to user
    }).fail( function() {
      alert("Sorry, we were unable to change your item quantity! Please contact support.");
    });
  });

  $('.plus_item').on('click', function(event) {
    event.preventDefault();
    //TODO: grab the quantity inside the data attribute
    var currentQty = $(this).parent("div")
                            .siblings(".qty_value")
                            .find(".qty_input")
                            .data("qty");
    //TODO: AJAX POST to server the value of the data attribute
    $.ajax({
      method: 'POST',
      url: '/cart/' + (currentQty + 1).toString();
    }).then( function() {
      // add 1 to quantity inside data attribute
      currentQty += 1;
      // update new quantity for value
      $(this).parent("div")
             .siblings(".qty_value")
             .find(".qty_input")
             .attr("value", currentQty);
      $(this).parent("div")
             .siblings(".qty_value")
             .find(".qty_input")
             .data("qty", currentQty);
    }).fail( function() {
      alert("Sorry, were unable to add 1 to your quantity! Please contact suppport.");
    });
  });

  $('.minus_item').on('click', function(event) {
    event.preventDefault();
    //TODO: grab the quantity inside the data attribute
    var currentQty = $(this).parent("div")
                            .siblings(".qty_value")
                            .find(".qty_input")
                            .data("qty");
    //TODO: AJAX POST to server to decrement quantity for that item.
        $.ajax({
      method: 'POST',
      url: '/cart/' + (currentQty - 1).toString();
    }).then( function() {
      // add 1 to quantity inside data attribute
      currentQty += 1;
      // update new quantity for value
      $(this).parent("div")
             .siblings(".qty_value")
             .find(".qty_input")
             .attr("value", currentQty);
      $(this).parent("div")
             .siblings(".qty_value")
             .find(".qty_input")
             .data("qty", currentQty);
    }).fail( function() {
      alert("Sorry, were unable to add 1 to your quantity! Please contact suppport.");
    });
  });
});