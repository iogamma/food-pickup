$(document).ready(function(){
  //element for placed order to order list
  function createOrderElement(invoice){

    var $order = $('.containCustOrders').addClass('.custOrders')
    var orderInfo = '<div class="row orderInfo">'
    var $orderId = $(".col-md-4 orderId").text(invoice.orders.id);
    var $custName = $(".col-md-4 custName").text(invoice.users.username);
    var $phoneNumber = $(".col-md-4 phoneNumber").text(invoice.users.phone_number);
    var foodItem = '<div class="row foodItem">'
    var space2col = '<div class =".col-md-2"></div>';
    var $itemName = $(".col-md-6 itemName").text(invoice.items.name);
    var $quantity = $(".col-md2 quantity").text(invoice.items.id[?]);
    var responseToOrder = '<div class="row responseToOrder">'
    var informMsg = '<div class="text-center col-md-4">Please inform customer of order pick up time</div>'
    var timeInput = '<input type="text" class="form-control" id="deliveryTime" placeholder="minutes">'
    var submitTime = '<a href="#" class="btn btn-primary btn-lg">submit</a>'

    $order.append(orderInfo, foodItem, responseToOrder);
    orderInfo.append($orderId, $custName, $phoneNumber);
    foodItem.append(space2col, $itemName, $quantity, space2col);
    responseToOrder.append(space2col, informMsg, timeInput, submitTime, space2col);

    return $order;
  }

  //element for order to queue list
  function createQueueElement(invoice){

    var $order = $('.containPendingOrders').addClass('.custQueue')
    var orderInfo = '<div class="row orderInfo">'
    var $orderId = $(".col-md-4 orderId").text(invoice.orders.id);
    var $custName = $(".col-md-4 custName").text(invoice.users.username);
    var $phoneNumber = $(".col-md-4 phoneNumber").text(invoice.users.phone_number);
    var foodItem = '<div class="row foodItem">'
    var space2col = '<div class =".col-md-2"></div>';
    var $itemName = $(".col-md-6 itemName").text(invoice.items.name);
    var $quantity = $(".col-md2 quantity").text(invoice.items.id[?]);
    var clearQueue = '<div class="row clearQueue">';
    var statusOfOrder = '<div class="text-center col-md-4">Pending for pickup....</div>';
    var completeOrder = '<div class="text-center col-md-4"><a href="#" class="btn btn-primary btn-lg">Complete Order</a></div>';


    $order.append(orderInfo, foodItem, clearQueue);
    orderInfo.append($orderId, $custName, $phoneNumber);
    foodItem.append(space2col, $itemName, $quantity, space2col);
    clearQueue.append(space2col, statusOfOrder, completeOrder, space2col);

    return $order;
  }

  function renderOrders(orders) {
    var orders = {

    }
    for(id of orders){
      $('.custOrders').append(createOrderElement(id));
    }
  }

  // function loadOrders() {
  //   $.ajax({
  //       url: 'restaurants/id1/orders',
  //       method: 'GET',
  //       success: renderOrders
  //   });
  // }
  // //RUN THIS FUNCTION EVERY 15 SEC WHEN OWNER LOGGED IN
  // loadOrders();

  renderOrders();





});