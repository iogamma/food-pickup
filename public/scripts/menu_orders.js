$(document).ready(function() {
  // Change the data attribute after quantity change
  $(".qty_input").on("change", function() {
    var newQty = $(this).val();
    $(this).data("qty", newQty);
  })

  var RESTAURANT_ID = $(".restaurant_menu").data("restaurant_id");
  // Send AJAX call to server to update item's quantity
  $(".qty_input").on("blur", function(event) {
    event.preventDefault();
    //Find the item's ID
    var itemId = $(this).closest(".items_id").data("item_id");
    var $thisQtyInput = $(this);
    var currentQty = Number($thisQtyInput.val());

     // Ajax POST to server for that item with the input value
    $.ajax({
      data   : {qty: currentQty},
      method : "POST",
      url    : "/cart/" + itemId
    }).then( function() {
      changeInputValue($thisQtyInput, currentQty);
      updateCart(RESTAURANT_ID);
    }).fail( function() {
      alert("Sorry, we were unable to change your item quantity! Please contact support.");
    });
  });

  $(".plus_item").on("click", function(event) {
    event.preventDefault();
    // grab the quantity inside the data attribute
    var $thisQtyInput = $(this).parent("div")
                               .siblings(".qty_value")
                               .find(".qty_input");
    var itemId = $(this).closest(".items_id").data("item_id");
    var currentQty = Number($thisQtyInput.val());

    // AJAX POST to server the value of the data attribute
    $.ajax({
      data   : {qty: (currentQty + 1)},
      method : "POST",
      url    : "/cart/" + itemId
    }).then(function() {
      // update new quantity for value
      changeInputValue($thisQtyInput, currentQty + 1);
      updateCart(RESTAURANT_ID);

    }).fail(function() {
      alert("Sorry, were unable to add 1 to your quantity! Please contact suppport.");
    });
  });

  $(".minus_item").on("click", function(event) {
    event.preventDefault();
    //TODO: grab the quantity inside the data attribute
    var $thisQtyInput = $(this).parent("div")
                                .siblings(".qty_value")
                                .find(".qty_input");
    var currentQty = Number($thisQtyInput.val());
    var itemId = $(this).closest(".items_id").data("item_id");

    // AJAX POST to server the value of the data attribute
    $.ajax({
      data   : {qty: (currentQty - 1)},
      method : "POST",
      url    : "/cart/" + itemId
    }).then(function() {
      // update new quantity for value
      changeInputValue($thisQtyInput, currentQty - 1);
      updateCart(RESTAURANT_ID);
    }).fail(function() {
      alert("Sorry, were unable to subtract 1 to your quantity! Please contact suppport.");
    });
  });
});
