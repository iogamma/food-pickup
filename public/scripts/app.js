
$(document).ready(function(){

  function renderOrders(data) {
    // for(id of orders){
    //   $('.custOrders').append(createOrderElement(id));
    // }
        var data = {
        orderId: 1,
        users: [{id:2, name:"Abc", phone_number: 6041231234}],
        items: [{id: 3, name: "chips"/*, quantity: 5*/}]
    }
    console.log("hello")
    $('.ordersList').append(createOrderElement(data));
  }

  //element for placed order to order list
  function createOrderElement(invoice){

    var $order = $("<div>", {"class": "row custOrders"});
    var $column = $("<div>", {"class": "col-md-12"});

    var $orderInfo = $("<div>", {"class": "row orderInfo"});
    var $orderId = $("<div>", {"class": "col-md-3 orderId"}).text(invoice.orderId);
    var $custName = $("<div>", {"class": "col-md-6 custName"}).text(invoice.users[name]);
    var $phoneNumber = $("<div>", {"class": "col-md-3 phoneNumber"})/*.text(invoice.users[phone_number])*/;

    var $foodItem = $("<div>", {"class": "row foodItem"});
    var $itemName = $("<div>", {"class": "col-md-10 itemName"}).text(invoice.items[name]);
    var $quantity = $("<div>", {"class": "col-md-2 quantity"})/*.text(invoice.items[quantity])*/;

    var $responseToOrder = $("<div>", {"class": "row responseToOrder"});
    var $informMsg = $("<div>", {"class": "text-center col-md-6"}).text("Please inform customer of order pick up time");
    var $timeInput = $("<input>", {
      "type": "text",
      "class": "form-control",
      "id": "deliveryTime",
      "placeholder": "minutes"
    });
    var $submitTime = $("<a>", {
      "href": "#",
      "class": "btn btn-primary btn-lg"
    }).text("Submit");
    var $inputCol = $("<div>", {"class": "col-md-2"}).append($timeInput);
    var $submitCol = $("<div>", {"class": "col-md-4"}).append($submitTime);


    $order.append($column);
    $column.append($orderInfo, $foodItem, $responseToOrder);
    $orderInfo.append($orderId, $custName, $phoneNumber);
    $foodItem.append($itemName, $quantity);
    $responseToOrder.append($informMsg, $inputCol, $submitCol);

    return $order;
  }

  //element for order to queue list
  // function createQueueElement(invoice){

  //   var $order = $('<div>').addClass('.custQueue')
  //   var orderInfo = $('<div class="row orderInfo">')
  //   var $orderId = $(".col-md-4 orderId").text(invoice.orderId);
  //   var $custName = $(".col-md-4 custName").text(invoice.users[name]);
  //   // var $phoneNumber = $(".col-md-4 phoneNumber").text(invoice.users[phone_number]);
  //   var foodItem = '<div class="row foodItem">'
  //   var space2col = '<div class =".col-md-2"></div>';
  //   var $itemName = $(".col-md-6 itemName").text(invoice.items[name]);
  //   //var $quantity = $(".col-md2 quantity").text(invoice.items[quantity]);
  //   var clearQueue = $('<div class="row clearQueue">');
  //   var statusOfOrder = '<div class="text-center col-md-4">Pending for pickup....</div>';
  //   var completeOrder = '<div class="text-center col-md-4"><a href="#" class="btn btn-primary btn-lg">Complete Order</a></div>';


  //   $order.append(orderInfo, foodItem, clearQueue);
  //   orderInfo.append($orderId, $custName/*, $phoneNumber*/);
  //   foodItem.append(space2col, $itemName, /*$quantity,*/ space2col);
  //   clearQueue.html(space2col, statusOfOrder, completeOrder, space2col);

  //   return $order;
  // }



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