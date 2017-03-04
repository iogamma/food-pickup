$(document).ready(function(){
  //element for placed order to order list
  function createItem(item){
    var $newItemRow = $("<div>", {
      "class": "itemContainer row"});
    var $newItemCol = $("<div>", {
      "class": "itemBlock col-md-12"});

    var $imageRow = $("<div>", {"class": "item_image row"});
    var $itemImage = $("<div>", {
      "class": "col-md-12",
    }).html('<img src=http://cdn.hercampus.com/s3fs-public/2013/02/27/topic-1350661050.jpg class="center-block">')

    var $namePriceRow = $("<div>", {"class": "name_price row"});
    var $namePrice = $("<div>", {
      "class": "col-md-12 text-center "
    }).text("Burgers - $12.00");

    var $itemDetailRow = $("<div>", {"class": "item_detail row"});
    var $itemDetail = $("<div>", {
      "class": "col-md-12 text-center"
    }).text("This burger is epic.");

    var $itemQtyRow = $("<div>", {"class": "item_qty row"});
    var $itemQty = $("<div>", {
      "class": "col-md-12 text-center"
    }).html("<button>minus</button><span>qty field</span><button>plus</button>");

    $newItemRow.append($newItemCol);
    $newItemCol.append($imageRow, $namePriceRow, $itemDetailRow, $itemQtyRow);
    $imageRow.append($itemImage);
    $namePriceRow.append($namePrice);
    $itemDetailRow.append($itemDetail);
    $itemQtyRow.append($itemQty);

    return $newItemRow;
  }

  function renderMenu(menu) {
    var $item = createItem();
    var $anotherItem = createItem();
    // for(var i; i < 5; i++) {
    //   console.log(2);
    //   $(".center").append($item);
    // }
    $(".restaurant_menu").append($item);
    $(".restaurant_menu").append($anotherItem);


    // for(id of items){
    //   $('.custOrders').append(createItems(id));
    // }
  }

  function loadMenu() {
    $.ajax({
        url: 'restaurants/',
        method: 'GET',
        success: renderOrders
    });
  }

//  renderMenu();
});