$(document).ready(function() {
  $qtyInput = $('.qty_input');

  // Change the data attribute after quantity change
  $qtyInput.on('change', function() {
    var newQty = $(this).val();
    $(this).data('qty', newQty);
  })

  // Send AJAX call to server to update item's quantity
  $qtyInput.on('blur', function(event) {
    event.preventDefault();
    //Find the item's ID
    var $thisQtyInput = $(this);
    var itemId = $(this).closest(".items_id").data("item_id");
    var currentQty = $thisQtyInput.data('qty');
     //TODO: Ajax POST to server for that item with the input value
    $.ajax({
      data   : {qty: currentQty},
      method : 'POST',
      url    : '/cart/' + itemId
    }).then( function() {
      // Optional HTML confirmation to user
    }).fail( function() {
      alert("Sorry, we were unable to change your item quantity! Please contact support.");
    });
  });

  $('.plus_item').on('click', function(event) {
    event.preventDefault();
    //TODO: grab the quantity inside the data attribute
    var $thisQtyInput = $(this).parent("div")
                                .siblings(".qty_value")
                                .find(".qty_input");
    var currentQty = $thisQtyInput.data("qty");
    var itemId = $(this).closest(".items_id").data("item_id");

    //TODO: AJAX POST to server the value of the data attribute
    $.ajax({
      data   : {qty: (currentQty + 1)},
      method : 'POST',
      url    : '/cart/' + itemId
    }).then(function() {
      // add 1 to quantity inside data attribute
      currentQty += 1;
      // update new quantity for value
      $thisQtyInput.attr("value", currentQty);
      $thisQtyInput.data("qty", currentQty);
    }).fail(function() {
      alert("Sorry, were unable to add 1 to your quantity! Please contact suppport.");
    });
  });

  $('.minus_item').on('click', function(event) {
    event.preventDefault();
    //TODO: grab the quantity inside the data attribute
    var $thisQtyInput = $(this).parent("div")
                                .siblings(".qty_value")
                                .find(".qty_input");
    var currentQty = $thisQtyInput.data("qty");
    var itemId = $(this).closest(".items_id").data("item_id");

    //TODO: AJAX POST to server the value of the data attribute
    $.ajax({
      data   : {qty: (currentQty - 1)},
      method : 'POST',
      url    : '/cart/' + itemId
    }).then(function() {
      // add 1 to quantity inside data attribute
      currentQty -= 1;
      // update new quantity for value
      $thisQtyInput.attr("value", currentQty);
      $thisQtyInput.data("qty", currentQty);
    }).fail(function() {
      alert("Sorry, were unable to subtract 1 to your quantity! Please contact suppport.");
    });
  });
});
