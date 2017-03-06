// Given an order, return calculated subtotal, gst, pst, and total object

function calOrderTotals(arrOrder) {
    var totals = {
      subtotal: 0,
      gst     : 0,
      pst     : 0,
      total   : 0
    }
  arrOrder.forEach( function(item) {
      itemTotal = Number(item.quantity) * item.price;
      totals.subtotal += itemTotal;
    });
    totals.gst = totals.subtotal * 0.05;
    totals.pst = totals.subtotal * 0.07;
    totals.total = totals.subtotal + totals.gst + totals.pst;

    return totals;
}
// converts a float to a float with 2 decimal places
function prettyPrice(price) {
  return parseFloat(Math.round(price * 100) / 100).toFixed(2);
}
// get latest total from database
function updateCart(restaurantId) {
  // make an ajax call for cart information and update cart
  $.ajax({
    method : 'GET',
    url    : '/cart/' + restaurantId
  }).then( function(data) {
    var totals = calOrderTotals(data);

    $(".chosen_items").empty();
    data.forEach( function(item) {
      if(item.quantity) {
        var itemTotal = parseFloat(Math.round((item.quantity * item.price) * 100) / 100).toFixed(2);
        var $itemRow = $("<div>", { class: "row" });
        var $itemColName = $("<div>", { class: item.id + " col-md-7"});
        var $itemColQty = $("<div>", { class: "itemQty col-md-1"});
        var $itemColTotal = $("<div>", { class: "itemTotal col-md-1"});

        $itemColName.text(item.name);
        $itemColQty.text(item.quantity);
        $itemColTotal.text(itemTotal);

        $(".chosen_items").append($itemRow);
        $($itemRow).append($itemColName, $itemColQty, $itemColTotal)
      }
    });
    $(".subtotal").html("&#36;" + prettyPrice(totals.subtotal));
    $(".pst").html("&#36;" + prettyPrice(totals.pst));
    $(".gst").html("&#36;" + prettyPrice(totals.gst));
    $(".total").html("&#36;" + prettyPrice(totals.total));
  }).fail( function() {
    //TODO: Handle error
  });
}

// Change the input value given a jQuery target and a current quantity
function changeInputValue($target, currentQty) {
  $target.attr("value", currentQty);
}

