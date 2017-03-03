$(document).ready(function(){
  function createOrderElement(invoice){

    const $order = $('.containCustOrders').addClass('.custOrders')
    const orderInfo = '<div class="row orderInfo">'
    const $orderId = $(".col-md-4 orderId").text(invoice.orders.id);
    const $custName = $(".col-md-4 custName").text(invoice.users.username);
    const $phoneNumber = $(".col-md-4 phoneNumber").text(invoice.users.phone_number);
    const foodItem = '<div class="row foodItem">'
    const space2col = '<div class =".col-md-2"></div>';
    const $itemName = $(".col-md-6 itemName").text(invoice.items.name);
    const $quantity = $(".col-md2 quantity").text(invoice.items.id[?]);
    const responseToOrder = '<div class="row responseToOrder">'
    const informMsg = '<div class="text-center col-md-4">Please inform customer of order pick up time</div>'
    const timeInput = '<input type="text" class="form-control" id="deliveryTime" placeholder="minutes">'
    const submitTime = '<a href="#" class="btn btn-primary btn-lg">submit</a>'

    $order.append(orderInfo, foodItem, responseToOrder);
    orderInfo.append($orderId, $custName, $phoneNumber);
    foodItem.append(space2col, $itemName, $quantity, space2col);
    responseToOrder.append(space2col, informMsg, timeInput, submitTime, space2col);

    return $order;
  }

  function renderOrders(orders) {
    // loops through tweets
    for(id of orders){
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
      $('.custOrders').append(createOrderElement(id));
    }
  }

  function loadOrders() {
    $.ajax({
        url: 'restaurants/:restaurants_id/orders',
        method: 'GET',
        success: renderOrders
    });
  }
  //RUN THIS FUNCTION EVERY 15 SEC WHEN OWNER LOGGED IN
  loadOrders();

});